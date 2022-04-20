/**
 * @module timeout
 */

'use strict';

module.exports = require('./curry2') (timeout);

/**
 * Similar to {@link external:setTimeout setTimeout()} except that this function flips the first two parameters and
 * it returns a function instead of a `timeoutid`. Call the returned function to cancel the pending the timeout.
 * 
 * `timeout()` is curried with an arity of 2 by default.
 * 
 * @func timeout
 * @see {@link external:setTimeout setTimeout()}
 * @param {integer} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function} A function to clear the pending timeout
 */
function timeout(delayms, func, ...args) {

    const timeoutid = setTimeout(func, delayms, ...args);

    return function cleartimeout() {
        clearTimeout(timeoutid);
    }
}