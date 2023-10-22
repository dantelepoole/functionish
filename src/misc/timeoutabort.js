/**
 * @module misc/timeoutabort
 */

'use strict';

const EVENT_ABORT = 'abort';
const METHOD_DISPATCH_EVENT = 'dispatchEvent';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const bind = require('../bind');
const noop = require('../noop');
const delay = require('../delay');

/**
 * A variant of {@link module:delay delay()} that triggers an `'abort'` event instead of calling a function when
 * the timeout expires. Instead of a `timeoutid`, this function returns a function that can be invoked without arguments
 * to cancel the pending timeout.
 * 
 * Instead of calling a callback function when the timeout expires, this function triggers an `'abort'` event that 
 * will be broadcast to any listeners of *abortcontroller*'s `signal`.
 * 
 * If an `'abort'` event is triggered on *abortcontroller*'s `signal` by external code, it will cancel the pending
 * timeout.
 * 
 * @example <caption>Example usage of `timeoutabort()`</caption>
 * 
 * const timeoutabort = require('functionish/timeoutabort');
 * 
 * const abortcontroller = new AbortController(); // See functionish/AbortController if you need a polyfill
 * const canceltimeout = timeoutabort(1000, abortcontroller.signal); // will trigger 'abort' event after 1 second
 * 
 * canceltimeout(); // cancel the pending timeout
 * // OR: abortcontroller.abort() // raise an 'abort' event and cancel the pending timeout
 * 
 * @function timeoutabort
 * @see {@link module:delay delay()}
 * @param {number} timeoutms The number of milliseconds to wait before triggering an abort event
 * @param {AbortSignal} abortsignal The AbortSignal to trigger the abort event with
 * @returns {function} A function to cancel the pending timeout
 */
function timeoutabort(timeoutms, abortsignal) {

    if(abortsignal.aborted) return noop;

    const raiseabortevent = bind(METHOD_DISPATCH_EVENT, abortsignal, EVENT_ABORT);
    const canceltimeout = delay(timeoutms, raiseabortevent);

    try {
        abortsignal.addEventListener(EVENT_ABORT, canceltimeout, OPTIONS_ONCE);
    } catch (error) {
        canceltimeout();
        throw error;
    }
    
    return canceltimeout;
}

module.exports = timeoutabort;