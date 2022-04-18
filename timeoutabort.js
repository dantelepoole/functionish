/**
 * @module timeoutabort
 */

'use strict';

const ABORT_EVENT = 'abort';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const bind = require('./bind');
const not = require('./not');
const timeout = require('./timeout');

/**
 * A variant of {@link module:timeout timeout()} that triggers an `'abort'` event instead of calling a function when
 * the timeout expires. Instead of a `timeoutid`, this function returns a function that can be invoked without arguments
 * to cancel the pending timeout.
 * 
 * Instead of calling a callback function when the timeout expires, this function triggers an `'abort'` event that 
 * will be broadcast to any listeners of *abortcontroller*'s `signal`.
 * 
 * If an `'abort'` event is triggered on *abortcontroller*'s `signal` by external code, it will cancel the pending
 * timeout.
 * 
 * `timeoutabort()` is curried by default.
 * 
 * @example
 * 
 * const timeoutabort = require('functionish/timeoutabort');
 * 
 * const abortcontroller = new AbortController(); // See functionish/AbortController if you need a polyfill
 * const canceltimeout = timeoutabort(1000, abortcontroller); // will trigger 'abort' event after 1 second
 * 
 * canceltimeout(); // cancel the pending timeout
 * // OR: abortcontroller.abort() // also causes the pending timeout to be cancelled
 * 
 * @func timeoutabort
 * @see {@link module:timeout timeout()}
 * @param {integer} delayms The number of milliseconds to wait before triggering an abort event
 * @param {AbortController} abortcontroller The AbortController to trigger the abort event with
 * @returns {function} A function to cancel the pending timeout
 */
module.exports = require('./curry2') (timeoutabort)

function timeoutabort(delayms, abortcontroller) {

    const abort = bind('abort', abortcontroller);
    const canceltimeout = timeout(delayms, abort);

    addaborteventlistener(canceltimeout, abortcontroller.signal);

    return canceltimeout;
}

function addaborteventlistener(eventlistener, abortsignal) {
    if( not(abortsignal.aborted) ) abortsignal.addEventListener(ABORT_EVENT, eventlistener, OPTIONS_ONCE)
}
