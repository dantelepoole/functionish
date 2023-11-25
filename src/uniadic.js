/**
 * @module uniadic
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/uniadic(): The target function has type '%s'. Expected a function.`;

const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that accepts an iterable object as its only argument and passes the iterable's items to
 * *targetfunc* as a spread parameter. Use this function to convert a function that accepts variable number of
 * parameters into a function that accepts only a single parameter (which must be iterable).
 *
 * If the argument passed to the returned function is not iterable, an error is thrown. However, if the argument
 * is `null` or `undefined` or the returned function is called without any arguments, *targetfunc* is called without
 * arguments as well.
 * 
 * @example <caption>Example usage of `uniadic()`</caption>
 * 
 * const { uniadic } = require('functionish');
 * 
 * const max = uniadic(Math.max);
 * 
 * max( [1,2,3] ); // returns 3
 * max(); // returns -Infinity
 * max(null); // returns -Infinity
 * 
 * @function uniadic
 * @see {@link module:variadic variadic()}
 * @param {function} targetfunc The function to convert
 * @returns {function}
 * @throws {TypeError} if *targetfunc* is not a function
 */
function uniadic(targetfunc) {

    validatetargetfunction(targetfunc);

    return (iterable=[]) => targetfunc(...iterable);
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = uniadic;