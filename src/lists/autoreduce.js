/**
 * @module lists/autoreduce
 */

'use strict';

const curry1 = require('../curry1');
const reduce = require('./reduce');

/**
 * Similar to {@link module:lists/reduce reduce()} except that no initial value is used. Instead, the first item in the
 * *list* is passed to the *reducer* on the first call along with the *list*'s second item. 
 * 
 * If the *list* contains a single item, that item is returned as `autoreduce()`'s return value. If the *list* is
 * empty, `undefined` is returned.
 * 
 * `autoreduce()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `autoreduce()`</caption>
 * 
 * const { autoreduce } = require('functionish/autoreduce');
 * 
 * const product = (a,b) => (a*b);
 * 
 * autoreduce(product, [1,2,4]); // returns 8
 * autoreduce(product, [42]); // returns 42
 * autoreduce(product, []); // returns undefined
 * 
 * @function autoreduce
 * @see {@link module:lists/reduce reduce()}
 * @param {function} reducer The reducer function
 * @param {iterable} list The iterable object producing the items to reduce
 * @returns {any}
 */
const autoreduce = curry1(function autoreduce(reducer, list) {

    let started = false;

    const autoreducer = (accumulator, nextvalue) => started
                                                  ? reducer(accumulator, nextvalue)
                                                  : (started = true, nextvalue);

    return reduce(autoreducer, undefined, list);
});

module.exports = autoreduce;
