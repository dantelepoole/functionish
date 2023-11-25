/**
 * @module variadic
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/variadic(): The target function has type '%s'. Expected a function.`;

const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that accepts a variadic argument list and invokes *targetfunc* with the arguments as a single
 * array.
 * 
 * Use this function to convert a function that accepts a single iterable argument to a function with a variadic
 * argument list.
 * 
 * If *targetfunc* is not a function, the returned function will throw an error. If the returned function is called
 * without any arguments, *targetfunc* will be invoked with an empty array.
 * 
 * @example <caption>Example usage of `variadic()`</caption>
 * 
 * const { variadic } = require('functionish');
 * 
 * function sum(numberarray) {
 *     return numberarray.reduce( (a,b)=>(a+b), 0 );
 * }
 * 
 * const sum_variadic = variadic(sum);
 * 
 * sum_variadic(1,2,3); // returns 6
 * 
 * @function variadic
 * @see {@link module:uniadic uniadic()}
 * @param {function} targetfunc The function to make variadic
 * @returns {function}
 * @throws {TypeError} if *targetfunc* is not a function
 */
function variadic(targetfunc) {

    validatetargetfunction(targetfunc);

    return (...args) => targetfunc(args);
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = variadic;