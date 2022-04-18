/**
 * @module ptimeout
 */

'use strict';

const TIMEOUTERROR_NAME = 'TimeoutError';

const isundefined = require('./isundefined');
const papply = require('./papply');

/**
 * Return a function that passes its arguments (prepended by any *preboundargs* provided to `ptimeout()`) to *func*
 * and returns a Promise that either resolves/rejects with *func*'s result (return value or thrown error) if *func*
 * completes within *delayms* milliseconds, or rejects with a TimeoutError after *delayms* have passes and *func*
 * has not completed.
 * 
 * The *func* argument **must** be a function that runs asynchronously and returns a Promise. If it is a regular
 * synchronous function `ptimeout()` will still work, but it is not guaranteed to work correctly, because as long
 * as the synchronous function is running the pending timer will not run, even if the timeout expires.
 * 
 * Important: when the timeout expires the timeout promise will reject with an error named 'TimeoutError'. This does
 * not mean that *func* itself will be interrupted or otherwise aborted, only that if *func* does eventually return
 * or throw after the timeout has expired, its result (return value or thrown error) will be silently discarded.
 * 
 * See {@link module:timeoutabort timeoutabort()} for a timeout variant that triggers an AbortController when the
 * timeout expires, allowing you to interrupt functions that are AbortController-aware.
 * 
 * `ptimeout()` is curried by default.
 * 
 * @example
 * 
 * const ptimeout = require('functionish/ptimeout');
 * const fs = require('fs/promises');
 * 
 * const readfile = ptimeout(10, fs.readFile);
 * 
 * readfile('/etc/hosts', 'utf8')
 *     .then(console.log)
 *     .catch(console.error);
 * 
 * // Print the contents of '/etc/hosts' to stdout if readfile() completes within 10 milliseconds, otherwise it
 * // prints a TimeoutError to stderr
 * 
 * @func ptimeout
 * @see {@link module:timeoutabort timeoutabort()}
 * @param {integer} delayms The number of milliseconds to wait before timing out
 * @param {function} func The function that should complete before the timeout expires
 * @param {...any} preboundargs The arguments to pre-bind to *func*
 * @returns {Promise}
 */
module.exports = require('./curry2') (ptimeout);

function ptimeout(delayms, func, ...preboundargs) {

    return function timeoutpromise(...args) {
        
        if( preboundargs.length > 0 ) args = [...preboundargs, ...args];

        const timeoutexecutor = timeoutexecutorfactory(delayms, func, args);

        return new Promise(timeoutexecutor);
    }
}

function timeoutexecutorfactory(delayms, func, args) {

    return function executor(resolve, reject) {

        const timer = timerfactory(delayms);

        const resolvetimeoutpromise = promisefulfillmentfactory(timer, resolve);
        const rejecttimeoutpromise = promisefulfillmentfactory(timer, reject);

        timer.start(

            function onpromisetimeout() {

                timer.stop();
                rejectwithtimeouterror(reject);
            }
        )

        const timedpromise = papply(func, ...args);

        timedpromise
            .then(resolvetimeoutpromise)
            .catch(rejecttimeoutpromise);
    }
}

function promisefulfillmentfactory(timer, fulfillmenthandler) {

    return function promisefulfill(data) {

        if( timer.isstopped() ) return;

        timer.stop();

        fulfillmenthandler(data);
    }
}

function timerfactory(delayms) {

    let timeoutid = undefined;

    function start(timeouthandler) {
        checktimeoutid(timeoutid);
        timeoutid = setTimeout(timeouthandler, delayms);
    }

    function stop() {
        clearTimeout(timeoutid);
        timeoutid = undefined;
    }

    function isstopped() {
        return isundefined(timeoutid);
    }

    const timer = { start, stop, isstopped }

    return timer;
}

function rejectwithtimeouterror(reject) {

    const error = new Error('timeout');
    error.name = TIMEOUTERROR_NAME;

    reject(error);
}

function checktimeoutid(timeoutid) {

    if( isundefined(timeoutid) ) return;

    const errormessage = `ptimeout(): the timer cannot be started because it is already running`;
    const error = new Error(errormessage);
    error.name = TIMEOUTERROR_NAME;

    throw error;
}