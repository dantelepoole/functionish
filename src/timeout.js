/**
 * @module timeout
 */

'use strict';

/**
 * Call *func* with the specified *args* after at least *delay* milliseconds have passed and return a function that
 * cancels the pending timeout.
 * 
 * @example <caption>Example usage of `timeout()`</caption>
 * 
 * const { timeout } = require('functionish');
 * 
 * // print 'foobar' to the screen after at least 1 second
 * const canceltimeout = timeout(1000, console.log, 'foobar');
 * 
 * canceltimeout(); // cancel the pending print operation
 * 
 * @function timeout
 * @see {@link external:setTimeout setTimeout()}
 * @param {integer} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function} A function to clear the pending timeout
 */
function timeout(delayms, func, ...args) {

    const timeoutid = setTimeout(func, delayms, ...args);
    
    const canceltimeout = () => clearTimeout(timeoutid);

    return canceltimeout;
}

module.exports = timeout;