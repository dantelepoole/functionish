/**
 * @module misc/timeoutabort
 */

'use strict';

const ABORTEVENT = 'abort';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const noop = require('../noop');
const timeout = require('../timeout');

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
 * @example
 * 
 * const timeoutabort = require('functionish/timeoutabort');
 * 
 * const abortcontroller = new AbortController(); // See functionish/AbortController if you need a polyfill
 * const canceltimeout = timeoutabort(1000, abortcontroller.signal); // will trigger 'abort' event after 1 second
 * 
 * canceltimeout(); // cancel the pending timeout
 * // OR: abortcontroller.abort() // also causes the pending timeout to be cancelled
 * 
 * @func timeoutabort
 * @see {@link module:timeout timeout()}
 * @param {integer} delay The number of milliseconds to wait before triggering an abort event
 * @param {AbortSignal} abortsignal The AbortSignal to trigger the abort event with
 * @returns {function} A function to cancel the pending timeout
 */
module.exports = function timeoutabort(delay, abortsignal) {

    if( abortsignal.aborted ) return noop;

    const ontimeout = abortsignal.dispatchEvent.bind(abortsignal, ABORTEVENT);
    const canceltimeout = timeout(delay, ontimeout)

    try {
        abortsignal.addEventListener(ABORTEVENT, canceltimeout, OPTIONS_ONCE);
    } catch (error) {
        canceltimeout();
        throw error;
    }
    
    return canceltimeout;
}