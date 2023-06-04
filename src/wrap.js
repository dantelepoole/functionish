/**
 * @module wrap
 */

'use strict';

const curry = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * to do
 * 
 * @function wrap
 * @param {function} wrapperfunc The function to wrap *func* with
 * @param {function} func The function to wrap
 * @returns {function}
 */
function wrap(wrapperfunc, func, ...partialargs) {

    return function _wrappedfunction(...args) {
        return wrapperfunc.call(this, func, ...partialargs, ...args);
    }
}

module.exports = curry(1, wrap);
