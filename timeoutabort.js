/**
 * @module timeoutabort
 */

'use strict';

const ABORTEVENT_TYPE = 'abort';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const ERR_BAD_DELAY = `TimeoutAbortError~The delay %s. Expected a positive integer.`;
const ERR_BAD_ABORTSIGNAL = `TimeoutAbortError~The abortsignal has type %s. Expected an AbortSignal.`;
const ERR_BAD_DISPATCHEVENT = `TimeoutAbortError~The abortsignal has no dispatchEvent() method.`;

const fail = require('./fail');
const notinteger = require('./notinteger');
const typeorclass = require('./typeorclass');
const timeout = require('./timeout');

const noop = ()=>{}

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

    validateinput(delay, abortsignal);

    if( abortsignal.aborted ) return noop;


    const canceltimeout = timeout(
        delay, 
        () => abortsignal.dispatchEvent(ABORTEVENT_TYPE)
    )

    abortsignal.addEventListener(ABORTEVENT_TYPE, canceltimeout, OPTIONS_ONCE);
    
    return canceltimeout;
}

function validateinput(delay, abortsignal) {

    if( notinteger(delay) || delay < 0 ) {
        fail(ERR_BAD_DELAY, (typeof delay === 'number') ? `is ${delay}` : `has type ${typeof delay}`);
    }

    const signalclass = typeorclass(abortsignal);
    if(signalclass !== 'AbortSignal') fail(ERR_BAD_ABORTSIGNAL, signalclass);

    if(typeof abortsignal.dispatchEvent !== 'function') fail(ERR_BAD_DISPATCHEVENT);

}