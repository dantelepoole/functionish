/**
 * @module cstyle
 */

'use strict';

/**
 * Return a function that calls *targetfunc* but never throws. Instead, it returns either *targetfunc*'s return value
 * or, if it throws, the thrown value.
 * 
 * @example <caption>Example usage of `cstyle()`</caption>
 * 
 * const { cstyle } = require('functionish');
 * 
 * function badfunction() { throw new Error(); }
 * const c_badfunction = cstyle(badfunction);
 * 
 * function goodfunction() { return 'no errors here'; }
 * const c_goodfunction= cstyle(goodfunction);
 * 
 * let result = c_badfunction(); // result = the thrown Error instance
 * result = c_goodfunction(); // result = 'no errors here'
 * 
 * @function cstyle
 * @param {function} targetfunc The target function
 * @returns {any} *targetfunc*'s return value or thrown value
 */
function cstyle(targetfunc) {

    return function _cstyle(...args) {
        try {
            return targetfunc(...args);
        } catch(error) {
            return error;
        }
    }
}

module.exports = cstyle;