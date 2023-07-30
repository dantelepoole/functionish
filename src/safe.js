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
            const data = func.call(this, ...partialargs, ...args);
            return [ ERROR_NULL, data ];
        } catch(error) {
            return [ error ];
        }

    }
}

module.exports = safe;