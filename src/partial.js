/**
 * @module partial
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/partial(): The target function has type %'s'. Expected a function.`;

const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that pre-binds the *partialargs* to *targetfunc*, so that when the returned function is called
 * it is passed the *partialargs* followed by its own arguments.
 * 
 * @example <caption>Example usage of `partial()`</caption>
 * 
 * const partial = require('functionish/partial')
 * 
 * const sum = (a,b) => (a+b);
 * 
 * const increment = partial(sum, 1);
 * 
 * increment(42); // returns 43
 * 
 * @function partial
 * @param {function} targetfunc The function to partially apply
 * @param  {...any} partialargs The arguments to partially apply *targetfunc* to
 * @returns {function}
 */
function partial(targetfunc, ...partialargs) {

    validatetargetfunction(targetfunc);
    
    return (partialargs.length > 0) && targetfunc.bind(null, ...partialargs) || targetfunc; 
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = partial;
