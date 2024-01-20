/**
 * @module fork
 */

'use strict';

const applicable = require('./applicable');
const isfunction = require('./types/isfunction');

const validatejoinfunction = func => isfunction(func) || raisebadjoinfunction(func);
const validatetargetfunction = func => isfunction(func) || raisebadtargetfunction(func);
const validatetargetfunctions = funcs => funcs.forEach(validatetargetfunction);

/**
 * Return a function that passes its arguments to each *targetfunc* and returns an array holding the return values.
 * 
 * The returned function has a method `join()` that accepts a join-function and returns a new function that passes
 * the array of return values to the join-function as a rest parameter and returns its return value. 
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 * @function fork
 * @param {...function[]} targetfuncs The functions to call
 * @returns {function}
 */
function fork(...targetfuncs) {
    
    validatetargetfunctions(targetfuncs);

    const _fork = (...args) => targetfuncs.map( applicable(...args) );

    _fork.join = func => validatejoinfunction(func) && ((...args) => func( ..._fork(...args) ));

    return _fork;
}

function raisebadtargetfunction(func) {

    const errormessage = `functionish/fork(): One or more target functions has type ${typeof func}. Expected a function.`;
    throw new TypeError(errormessage);
}

function raisebadjoinfunction(func) {

    const errormessage = `functionish/fork().join(): The join function has type ${typeof func}. Expected a function.`;
    throw new TypeError(errormessage);
}

module.exports = fork;