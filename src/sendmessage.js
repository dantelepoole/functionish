/**
 * @module sendmessage
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');

/**
 * to do
 * 
 * @example <caption>Example usage of `sendmessage()`</caption>
 * 
 * @function sendmessage
 * @returns {any}
 */
function sendmessage(message, ...args) {

    const target = args.pop();

    return isfunction(message)
         ? message.call(target, ...partialargs, ...args)
         : target[message](...partialargs, ...args);
}

module.exports = curry(1, sendmessage);