/**
 * @module lists/autoreduce
 */

'use strict';

const NO_INITIAL_VALUE = undefined;

const isfunction = require('../types/isfunction');
const issingleton = require('../arrays/issingleton');
const reduce = require('./reduce');
const resolve = require('../misc/resolve');

/**
 * Similar to {@link module:lists/reduce reduce()} except that no initial value is used. Instead, the first item in the
 * *list* is passed to the *reducer* on the first call along with the *list*'s second item. 
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.

 * If the *list* contains a single item, that item is returned as `autoreduce()`'s return value. If the *list* is
 * empty, `undefined` is returned.
 * 
 * `autoreduce()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `autoreduce()`</caption>
 * 
 * const { autoreduce } = require('functionish/lists');
 * 
 * const product = (a,b) => (a*b);
 * 
 * autoreduce(product, [1,2,4]); // returns 8
 * autoreduce(product, [42]); // returns 42
 * autoreduce(product, []); // returns undefined
 * 
 * @function autoreduce
 * @see {@link module:lists/reduce reduce()}
 * @see {@link module:misc/resolve resolve()}
 * @param {function} reducer The reducer function
 * @param {iterable} list The iterable object producing the items to reduce
 * @returns {any}
 */
function autoreduce(reducer, list) {

    let started = false;

    isfunction(reducer) || (reducer = resolve(reducer));

    const autoreducer = (accumulator, nextvalue) => started
                                                  ? reducer(accumulator, nextvalue)
                                                  : (started = true, nextvalue);

    return issingleton(arguments)    
         ? reduce.bind(null, autoreducer, NO_INITIAL_VALUE)
         : reduce(autoreducer, NO_INITIAL_VALUE, list);
}

module.exports = autoreduce;
