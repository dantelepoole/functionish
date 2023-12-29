/**
 * @module lists/reduce
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduce(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
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

    isfunction(reducer) || (reducer = resolve(reducer));

    const arity = arguments.length;

    return (arity === 1) ? reduce.bind(null, reducer)
         : (arity === 2) ? reduce.bind(null, reducer, initialvalue)
         : isfunction(sourcelist?.reduce) ? sourcelist.reduce(reducer, initialvalue)
         : isiterable(sourcelist) ? reducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function reducelist(reducer, initialvalue, list) {

    let accumulator = initialvalue;

    for(const item of list) accumulator = reducer(accumulator, item);

    return accumulator;
}

module.exports = reduce;
