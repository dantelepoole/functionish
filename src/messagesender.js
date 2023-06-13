/**
 * @module messagesender
 */

'use strict';

const curry = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `messagesender()`</caption>
 * 
 * @function messagesender
 */
function messagesender(method, ...args) {
    return object => object[method](...args);
}

module.exports = curry(1, messagesender);