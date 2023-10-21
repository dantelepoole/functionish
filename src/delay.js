/**
 * @module delay
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const defer = require('./defer');

/**
 * Call *func* with the specified *args* after at least *delay* milliseconds have passed and return a function that
 * cancels the delayed *func* invocation.
 * 
 * `delay()` is curried by default with unary arity.
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

    const deferredfunc = defer(func, ...args);
    const timeoutid = setTimeout(deferredfunc, delayms);
    
    return clearTimeout.bind(THIS_NULL, timeoutid);
}

module.exports = curry(1, delay);