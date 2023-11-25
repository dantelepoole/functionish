/**
 * @module tap
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/tap(): The target function has type '%s'. Expected a function.`;

const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that passes its arguments to *func* and returns its own first argument.
 * 
 * @example <caption>Example usage of `tap()`</caption>
 * 
 * const { tap } = require('functionish');
 * 
 * const log = tap(console.log);
 * 
 * log(42); // prints 42 to the screen and returns 42
 * 
 * @function tap
 * @param {function} targetfunc The function to tap
 * @returns {function}
 */
function tap(targetfunc) {

    validatetargetfunction(targetfunc);
    
    return (...args) => (targetfunc(...args), args[0]);
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = tap;