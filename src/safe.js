/**
 * @module safe
 */

'use strict';

const ERROR_NONE = undefined;
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

            return {
                data    : func.call(this, ...partialargs, ...args),
                error   : ERROR_NONE,
                iserror : false 
            }

        } catch(exception) {

            return { 
                data    : DATA_NONE,
                error   : exception,
                iserror : true
            }
        }

    }
}

module.exports = safe;