/**
 * @module ptimeoutabort
 */

 'use strict';

const ABORTEVENT = 'abort';
const ABORTERROR_NAME = 'AbortError';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const compose = require('./compose');
const papply = require('./papply');
const partial = require('./partial');
const tap = require('./tap');
const timeout = require('./timeout');

/**
 * Return a function that passes its arguments (prepended by any *preboundargs* provided to `ptimeoutabort()`) to *func*
 * and returns a Promise that either resolves/rejects with *func*'s result (return value or thrown error) if *func*
 * completes within *delayms* milliseconds, or rejects with an AbortError and triggers an 'abort' event on
 * *abortsignal*. If an 'abort' event is triggered by external code, the timeoutpromise rejects immediately with an
 * AbortError.
 * 
 * The *func* argument **must** be a function that runs asynchronously and returns a Promise. If it is a regular
 * synchronous function `ptimeoutabort()` will still work, but it is not guaranteed to work correctly, because as long
 * as the synchronous function is executing the internal timeout-handler will not be invoked.
 * 
 * Important: when the timeout expires the timeout promise will reject with an error named 'AbortError'. Any error
 * thrown by *func* in response to the abort event will be silently ignored, as will *func*'s result (return value or
 * thrown error) in the case it is not AbortSignal-aware. Although `ptimeoutabort()` could in theory rely on *func*'s
 * promise to reject in case of an 'abort' event, not doing so makes `ptimeoutabort()` more flexible because it can be
 * used with functions that are or are not AbortSignal-aware and, more importantly, functions that produce promise
 * chains which combine functions that are and are not AbortSignal-aware.
 * 
 * If an abort event is triggered by external code the behaviour is unpredictable, as the rejection value will depend
 * on the order in which the AbortSignal invokes its event listeners.
 * 
 * See {@link module:ptimoue ptimeout()} for a Promise-based timeout that does not rely on an AbortSignal.
 * 
 * `ptimeoutabort)` is curried with an arity of 3 by default.
 * 
 * @example
 * 
 * const ptimeoutabort = require('functionish/ptimeoutabort');
 * const fs = require('fs/promises');
 * 
 * function geturl(url, abortsignal) {
 *   ...
 *   // Returns a Promise. Rejects when abortsignal is triggered.
 * }
 * 
 * const abortcontroller = new AbortController();
 * 
 * const timedgeturl = ptimeout(1000, abortcontroller.signal, geturl);
 * 
 * timegeturl('http://www.example.com/', abortcontroller.signal)
 *    .then(console.log)
 *    .catch(console.error);
 * 
 * // Print the contents of 'http://www.example.com/' to stdout if geturl() completes within 1 second, otherwise it
 * // prints an AbortError to stderr. If the abortcontroller is aborted by user code, the timegeturl()-promise will
 * // also reject with an AbortError.
 * 
 * @func ptimeoutabort
 * @see {@link module:ptimoue ptimeout()}
 * @param {integer} delayms The number of milliseconds to wait before timing out
 * @param {AbortSignal} abortsignal The AbortSignal to trigger when the timeout expires
 * @param {function} func The function that should complete before the timeout expires
 * @param {...any} preboundargs The arguments to pre-bind to *func*
 * @returns {Promise}
 */
module.exports = require('./curry3') (ptimeoutabort);

function ptimeoutabort(delayms, abortsignal, func, ...preboundargs) {

    return function timeoutpromise(...args) {
        
        const targetfunction = partial(func, ...preboundargs, ...args);

        const timeoutexecutor = timeoutexecutorfactory(delayms, abortsignal, targetfunction);

        return new Promise(timeoutexecutor);
    }
}

function timeoutexecutorfactory(delayms, abortsignal, targetfunction) {

    return function executor(resolve, reject) {

        const requesttoken = singleusetokendispenser();
        const tokenize = withtoken(requesttoken);

        function ontimeout() {
            abortsignal.dispatchEvent(ABORTEVENT);
            rejectwithaborterror(reject);
        }

        const cleartimeout = timeout(delayms, tokenize(ontimeout));
                
        const resolvetimeoutpromise = compose(resolve, tap(cleartimeout));
        const rejecttimeoutpromise = compose(reject, tap(cleartimeout));

        papply(targetfunction)
            .then( tokenize(resolvetimeoutpromise) )
            .catch( tokenize(rejecttimeoutpromise) );

        const aborttimeoutpromise = partial(rejectwithaborterror, reject);
        abortsignal.addEventListener(ABORTEVENT, tokenize(aborttimeoutpromise), OPTIONS_ONCE);
    }
}

const withtoken = require('./curry2') (

    function withtoken(requesttoken, func) {
    
        return function tokenized(...args) {
            const istokengranted = requesttoken();
            if( istokengranted ) return func(...args);
        }
    }
)

function rejectwithaborterror(reject) {

    const error = new Error(ABORTEVENT);
    error.name = ABORTERROR_NAME;

    reject(error);
}

function singleusetokendispenser() {

    let istokengranted = false;

    return function requesttoken() {

        if( istokengranted ) return false;
        istokengranted = true;
        
        return true;
    }
}