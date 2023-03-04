/**
 * @module delay
 */

'use strict';

const CONTEXT_NONE = null;

const curry = require('./curry');

/**
 * Call *func* with the specified *args* after at least *delay* milliseconds have passed and return a function that
 * cancels the delayed function.
 * 
 * [to do: curried]
 * 
 * @example <caption>Example usage of `delay()`</caption>
 * 
 * const { delay } = require('functionish');
 * 
 * // print 'foobar' to the screen after at least 1 second
 * const canceldelayedfunc = delay(1000, console.log, 'foobar');
 * 
 * canceldelayedfunc(); // cancel the pending print operation
 * 
 * @function delay
 * @see {@link external:setTimeout setTimeout()}
 * @param {integer} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function} A function to clear the pending delayed function
 */
function delay(delayms, func, ...args) {

    const timeoutid = setTimeout(func, delayms, ...args);
    
    return clearTimeout.bind(CONTEXT_NONE, timeoutid);
}

module.exports = curry(1, delay);