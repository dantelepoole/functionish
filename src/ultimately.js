/**
 * @module ultimately
 */

'use strict';

const ERROR_NONE = undefined;
const RESULT_NONE = undefined;

/**
 * to do
 * 
 * @example <caption>Example usage of `attempt()`</caption>
 * 
 * to do
 * 
 * @function ultimately
 * @param {function} ultimatelyhandler to do
 * @param {function} func The function to run
 * @param  {...any} args The arguments to pass to *func*
 * @returns {any}
 */
function ultimately(ultimatelyhandler, func) {

    return function _ultimately(...args) {

        try {

            const result = func(...args);
            
            return ultimatelyhandler(ERROR_NONE, result);

        } catch(error) {
            return ultimatelyhandler(error, RESULT_NONE);
        }
    }
}

module.exports = ultimately;