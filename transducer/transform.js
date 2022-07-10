/**
 * @module transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transduce/transform/reject');

const fail = require('../fail');
const isarray = require('../isarray');
const notiterable = require('../notiterable');
const transduce = require('./transduce');
const typeorclass = require('../typeorclass');

const nottransducer = transducer => (typeof transducer !== 'function' || transducer.name !== '_transducer_');
const idreducer = (_,x) => x;

/**
 * Return an iterable object that use the *transducer* function to transform the items produced by *list*.
 * 
 * The *transducer* may either be a transducer function as returned by {@link module:transduce transduce()} or an
 * array of transformation functions, i.e. the types of functions accepted by {@link module:transduce transduce()}.
 * 
 * The *list* must be an iterable object producing the items to transform. The returned iterable will transform the
 * items produced by *list* and will ignore any item that the *transducer* rejects (i.e. filters out).
 * 
 * `transform()` is curried by default with binary arity.
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
 * const transformer = transform( [predicate(iseven), double], [1,2,3,4,5] )
 * 
 * Array.from(transformer); // returns [4,8]
 * 
 * @func transform
 * @see {@link module:transduce transduce()}
 * @param {function} transducer The transducer function that transforms the items produced by *list*
 * @param {iterable} list An iterable object that produces the items to transform
 * @returns {iterable}
 */
module.exports = require('../curry2') (transform);

function transform(transducer, list) {

    if( nottransducer(transducer) ) transducer = isarray(transducer) ? transduce(...transducer) : transduce(transducer);
    else if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));

    const transform = transducer(idreducer);

    return {
        [Symbol.iterator] : function* () {

            for(const item of list) {

                const transformeditem = transform(TRANSFORM_REJECT, item);

                if(transformeditem !== TRANSFORM_REJECT) yield transformeditem;
            }
        }
    }
}
