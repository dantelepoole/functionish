/**
 * @module ultimately
 */

'use strict';

const ERROR_NONE = undefined;
const RESULT_NONE = undefined;

const curry  = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `ultimately()`</caption>
 * 
 * to do
 * 
 * @function ultimately
 * @param {function} ultimatelyhandler to do
 * @param {function} func The function to run
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

module.exports = curry(1, ultimately);