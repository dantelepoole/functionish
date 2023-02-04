/**
 * @module misc/queuemicrotask
 */

'use strict';

const CONTEXT_NONE = undefined;

/**
 * Invoke *func* from the microtask queue, similar to {@link external:queueMicrotask queueMicrotask()} except that this
 * function also allows you to provide arguments to pass to *func* when it is invoked.
 * 
 * @example <caption>Example usage of `queuemicrotask()`</caption>
 * 
 * const { queuemicrotask } = require('functionish/misc');
 * 
 * function printmessages(...messages) {
 *    queuemicrotask(console.log, ...messages);
 *    console.log('start');
 * }
 * 
 * printmessages('foo', 'bar'); // prints 'start' first, then 'foo bar'
 * 
 * @function queuemicrotask
 * @see {@link external:queueMicrotask queueMicrotask()}
 * @param {function} func The function to run from the microtask queue
 * @param  {...any} boundargs The arguments to pass to *func*
 */
function queuemicrotask(func, ...boundargs) {

    if(boundargs.length > 0) func = func.bind(CONTEXT_NONE, ...boundargs);

    queueMicrotask(func);
}

module.exports = queuemicrotask;