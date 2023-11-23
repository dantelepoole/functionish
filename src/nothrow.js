/**
 * @module nothrow
 */

'use strict';

const RESULT_NONE = undefined;

/**
 * Return a function that calls *targetfunc* but never throws. Instead, the returned function als returns a
 * single-element array holding *targetfunc*'s return value if *targetfunc* returns, or a two-element array if
 * *targetfunc* throws: the first element containing `undefined` and the second containing the thrown value.
 * 
 * @example <caption>Example usage of `nothrow()`</caption>
 * 
 * const { nothrow } = require('functionish');
 * 
 * function badfunction() { throw new Error(); }
 * const badfunction_nothrow = nothrow(badfunction);
 * 
 * function goodfunction() { return 'no errors here'; }
 * const goodfunction_nothrow= nothrow(goodfunction);
 * 
 * let [returnvalue, error] = badfunction_nothrow(); // returnvalue = undefined, error = the thrown Error instance
 * 
 * [returnvalue, error] = goodfunction_nothrow(); // returnvalue = 'no errors here', error is undefined
 * 
 * @function nothrow
 * @param {function} targetfunc The function to block from throwing
 * @returns {any[]} A 1 or 2-element array
 */
function nothrow(targetfunc) {

    return function _nothrow(...args) {

        try {
            return [ targetfunc(...args) ];
        } catch(error) {
            return [ RESULT_NONE, error ];
        }

    }
}

module.exports = nothrow;