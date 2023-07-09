/**
 * @module safe
 */

'use strict';

const ERROR_NONE = null;
const DATA_NONE = undefined;

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
            return [ ERROR_NONE, func.call(this, ...partialargs, ...args) ];
        } catch(error) {
            return [ error, DATA_NONE ];
        }

    }
}

module.exports = safe;