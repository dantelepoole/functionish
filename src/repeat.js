/**
 * @module repeat
 */

'use strict';

const curry = require('./curry');

/**
 * Invoke *func* *count* number of times, passing *args* at each invocation, and return the result of
 * the last invocation or `undefined` is *func* is never called.
 * 
 * @example <caption>Example usage of `repeat()`</caption>
 * 
 * const { repeat } = require('functionish');
 * 
 * repeat(3, console.log, 'foobar'); // prints 'foobar' to the screen three times in a row
 * 
 * @function repeat
 * @param {number} count The number of times to call *func*
 * @param {function} func The function to invoke
 * @param {...any} args The arguments to pass to *func*
 * @returns {any}
 */
function repeat(count, func, ...args) {

    func = func.bind(this, ...args);

    let result = undefined;

    while(count-- > 0) result = func();

    return result;
}

module.exports = curry(1, repeat);