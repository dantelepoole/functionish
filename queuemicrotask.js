/**
 * @module queuemicrotask
 */

'use strict';

/**
 * Invoke *func* from the microtask queue, similar to {@link external:queueMicrotask queueMicrotask()} except that this
 * function also allows you to provide arguments to pass to *func* when it is invoked.
 * 
 * @func queuemicrotask
 * @param {function} func The function to run from the microtask queue
 * @param  {...any} args The arguments to pass to *func*
 */
module.exports = function queuemicrotask(func, ...args) {

    queueMicrotask(
        
        function microtask() {
            func(...args);
        }
    )
}