/**
 * @module nothrow
 */

'use strict';

const ERROR_NULL = null;

/**
 * to do
 * 
 * @example <caption>Example usage of `nothrow()`</caption>
 * 
 * to do
 * 
 * @function nothrow
 * @returns {any}
 */
function nothrow(targetfunc) {

    return function _safe(...args) {

        try {
            return [ ERROR_NULL, targetfunc(...args) ];
        } catch(error) {
            return [ error ];
        }

    }
}

module.exports = nothrow;