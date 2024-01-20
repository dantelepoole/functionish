/**
 * @module lists/autoreduceright
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/autoreduceright(): The source list has type %s. Expected an iterable object.`;

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
 * Similar to {@link module:lists/reduceright reduceright()} except that no initial value is used. Instead, the last
 * item in the *sourcelist* is passed to the *reducer* on the first call along with the *sourcelist*'s second-to-last item. 
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * If the *sourcelist* contains a single item, that item is returned as `autoreducerights()`'s return value. If
 * the *sourcelist* is empty, `undefined` is returned.
 * 
 * `autoreduceright()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `autoreduceright()`</caption>
 * 
 * const { autoreduceright } = require('functionish/autoreduceright');
 * 
 * const subtract = (a,b) => (a-b);
 * 
 * autoreduceright(subtract, [1,2,4]); // returns 1
 * autoreduceright(subtract, [42]); // returns 42
 * autoreduceright(subtract, []); // returns undefined
 * 
 * @function autoreduceright
 * @see {@link module:lists/reduce reduce()}
 * @see {@link module:misc/resolve resolve()}
 * @param {function} reducer The reducer function
 * @param {iterable} sourcelist The iterable object producing the items to reduce
 * @returns {any}
 */
const autoreduceright = curry1(function autoreduceright(reducer, sourcelist) {

    isfunction(reducer) || (reducer = resolve(reducer));
    isiterable(sourcelist) || raisebadsourcelisterror(sourcelist);

    const array = Array.from(sourcelist);
    const initialvalue = array.pop();

    return array.reduceRight(reducer, initialvalue);
})

module.exports = autoreduceright;
