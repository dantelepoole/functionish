/**
 * @module lists/autoreduce
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/autoreduce(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const getiterator = iterable => iterable[Symbol.iterator]();
const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * Similar to {@link module:lists/reduce reduce()} except that no initial value is used. Instead, the first item in the
 * *sourcelist* is passed to the *reducer* on the first call along with the *sourcelist*'s second item. 
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.

 * If the *sourcelist* contains a single item, that item is returned as `autoreduce()`'s return value. If the
 * *sourcelist* is empty, `undefined` is returned.
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
 * @param {iterable} sourcelist The iterable object producing the items to reduce
 * @returns {any}
 */
const autoreduce = curry1(function autoreduce(reducer, sourcelist) {

    isfunction(reducer) || (reducer = resolve(reducer));
    isiterable(sourcelist) || raisebadsourcelisterror(sourcelist);

    const iterator = getiterator(sourcelist);

    let result = getnextiteratorvalue(iterator, undefined);

    for(const item of iterator) result = reducer(result, item);

    return result;
});

function getnextiteratorvalue(iterator, defaultvalue) {

    let result = defaultvalue;
    const itemobject = iterator.next();

    itemobject.done || (result = itemobject.value);

    return result;
}

module.exports = autoreduce;
