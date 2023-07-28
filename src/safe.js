/**
 * @module safe
 */

'use strict';

const ERROR_NULL = null;

/**
 * to do
 * 
 * @example <caption>Example usage of `safe()`</caption>
 * 
 * to do
 * 
 * @function safe
 * @returns {any}
 */
function safe(func, ...partialargs) {

    return function _safe(...args) {

        try {
            return [ ERROR_NULL, func.call(this, ...partialargs, ...args) ];
        } catch(error) {
            return [ error ];
        }

    }
}

module.exports = safe;