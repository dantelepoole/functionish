/**
 * @module lists/reduceright
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduceright(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * Function variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. If *sourcelist* has
 * a `reduceRight()` method, call with the *reducer* function and the *initialvalue* and return the result. Otherwise,
 * iterate over *sourcelist* in reverse and call the *reducer* with each item and the previous call's return value (or,
 * on the first call, the *initialvalue*) and return the result.
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * `reduce()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * const { reduceright } = require('functionish/lists');
 * 
 * const subtract = (a,b) => (a-b);
 * 
 * reduceright(subtract, 100, [1,2,4]); // returns 93
 * reduceright(subtract, 0, [42]); // returns -42
 * reduceright(subtract, 42, []); // returns 42
 * 
 * @function reduceright
 * @see {@link module:misc/resolve resolve()}
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} sourcelist An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, sourcelist) {

    isfunction(reducer) || (reducer = resolve(reducer));

    const arity = arguments.length;

    return (arity === 1) ? doreduceright.bind(null, reducer)
         : (arity === 2) ? doreduceright.bind(null, reducer, initialvalue)
         : doreduceright(reducer, initialvalue, sourcelist);

}

function doreduceright(reducer, initialvalue, sourcelist) {

    return isfunction(sourcelist?.reduceRight) ? sourcelist.reduceRight(reducer, initialvalue)
         : isiterable(sourcelist) ? rightreducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function rightreducelist(reducer, initialvalue, sourcelist) {

    const array = [...sourcelist];

    let accumulator = initialvalue;

    for(let i = array.length-1; i >= 0; i -= 1) accumulator = reducer(accumulator, array[i]);

    return accumulator;
}

module.exports = curry(2, reduceright);
