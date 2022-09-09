/**
 * @module transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transduce/transform/reject');

const fail = require('./fail');
const isequal = require('./isequal');
const notiterable = require('./notiterable');
const transduce = require('./transduce');
const typeorclass = require('./typeorclass');

const idreducer = (_,x) => x;
const isrejected = isequal(TRANSFORM_REJECT);

/**
 * Return a function that accepts an iterable object and returns an iterable object that transforms its items by
 * applying the *transformations*.
 * 
 * The *transformations* may be any transformation functions accepted by {@link module:transduce transduce()}. See
 * {@link module:transduce transduce()} for further details.
 * 
 * The returned function takes an iterable object as its only argument. The iterable it returns applies the
 * *transformations* in order to each item produced by the argument iterable, dropping any values that any of the
 * *transformations* rejects.
 * 
 * @example
 * 
 * const transform = require('functionish/transform');
 * const predicate = require('functionish/predicate');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * const sum = (x,y) => (x+y);
 * 
 * const transformer = transform(predicate(iseven), double);
 * 
 * Array.from( transformer([1,2,3,4,5]) ); // returns [4,8]
 * 
 * @func transform
 * @see {@link module:transduce transduce()}
 * @param {...function[]} transformations The transformation functions to apply
 * @returns {function}
 */
module.exports = function transform(...transformations) {

    const transducer = transduce(...transformations);
    const transformer = transducer(idreducer);

    return function _transformer_(list) {

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator] : function* () {
    
                for(const item of list) {
    
                    const transformeditem = transformer(TRANSFORM_REJECT, item);

                    if( isrejected(transformeditem) ) continue;
                    
                    yield transformeditem;
                }
            }
        }
    }
}
