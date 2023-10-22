/**
 * @module misc/queuemicrotask
 */

'use strict';

const defer = require('../defer');

/**
 * Invoke *targetfunc* from the microtask queue, similar to {@link external:queueMicrotask queueMicrotask()} except that
 * this function also allows you to provide arguments to pass to *targetfunc* when it is invoked.
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
 * @param {function} targetfunc The function to run from the microtask queue
 * @param  {...any} args The arguments to pass to *targetfunc*
 */
function queuemicrotask(targetfunc, ...args) {

    const deferredfunc = defer(targetfunc, ...args);

    queueMicrotask(deferredfunc);
}

module.exports = queuemicrotask;