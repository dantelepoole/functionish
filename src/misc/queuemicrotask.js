/**
 * @module misc/queuemicrotask
 */

'use strict';

const CONTEXT_NONE = undefined;

const isempty = require('./isempty');

/**
 * Invoke *func* from the microtask queue, similar to {@link external:queueMicrotask queueMicrotask()} except that this
 * function also allows you to provide arguments to pass to *func* when it is invoked.
 * 
 * @func queuemicrotask
 * @param {function} func The function to run from the microtask queue
 * @param  {...any} boundargs The arguments to pass to *func*
 */
module.exports = function queuemicrotask(func, ...boundargs) {

    queueMicrotask(
        isempty(boundargs) ? func : func.bind(CONTEXT_NONE, ...boundargs)
    )
}