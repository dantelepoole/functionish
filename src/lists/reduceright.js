/**
 * @module lists/reduceright
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduceright(): The sourcelist argument has type %s. Expected an iterable object.`;

const curry = require('../curry');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * to do
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * to do
 * 
 * @function reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} sourcelist An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, sourcelist) {

    return isfunction(sourcelist.reduceRight) ? sourcelist.reduceRight(reducer, initialvalue)
         : isiterable(sourcelist) ? rightreducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function rightreducelist(reducer, initialvalue, list) {

    const array = [...list];

    let accumulator = initialvalue;

    for(let i = array.length-1; i >= 0; i -= 1) accumulator = reducer(accumulator, array[i]);

    return accumulator;
}

module.exports = curry(2, reduceright);
