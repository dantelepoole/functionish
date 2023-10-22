/**
 * @module nothrow
 */

'use strict';

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
function nothrow(func) {

    return function _nothrow(...args) {

        try {
            return { iserror:false, data:func(...args) }
        } catch(error) {
            return { iserror:true, data:error };
        }

    }
}

module.exports = nothrow;