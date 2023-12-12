/**
 * @module lists/reduce
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduce(): The sourcelist argument has type %s. Expected an iterable object.`;

const compose = require('../compose');
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
 * @example <caption>Example usage of `reduce()`</caption>
 * 
 * to do
 * 
 * @function reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} sourcelist An iterable object
 * @returns {any} The reduced value
 */
function reduce(reducer, initialvalue, sourcelist) {

    return isfunction(sourcelist.reduce) ? sourcelist.reduce(reducer, initialvalue)
         : isiterable(sourcelist) ? reducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function reducelist(reducer, initialvalue, list) {

    let accumulator = initialvalue;

    for(const item of list) accumulator = reducer(accumulator, item);

    return accumulator;
}

module.exports = curry(2, reduce);
