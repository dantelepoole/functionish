/**
 * @module sendmessage
 */

'use strict';

const curry = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `sendmessage()`</caption>
 * 
 * @function sendmessage
 */
function sendmessage(method, args=[], object) {
    return object[method](...args);
}

module.exports = curry(2, sendmessage);