/**
 * @module ptimeout
 */

'use strict';

const ABORTERROR_NAME = 'AbortError';
const TIMEOUTERROR = 'timeout';

const papply = require('./papply');
const partial = require('./partial');
const timeout = require('./timeout');
const wrap = require('./wrap');

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
 * Important: when the timeout expires the timeout promise will reject with an error named 'AbortError' and the
 * message 'timeout'. This does not mean that *func* itself will be interrupted or otherwise aborted, only that if
 * *func* does eventually return or throw after the timeout has expired, its result (return value or thrown error) will
 * be silently discarded. See {@link module:ptimeoutabort ptimeoutabort()} for a timeout variant that triggers an
 * AbortController when the timeout expires, allowing you to interrupt functions that are AbortController-aware.
 * 
 * `ptimeout()` is with an arity of 2 curried by default.
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
 * @see {@link module:ptimeoutabort ptimeoutabort()}
 * @param {integer} delayms The number of milliseconds to wait before timing out
 * @param {function} func The function that should complete before the timeout expires
 * @param {...any} preboundargs The arguments to pre-bind to *func*
 * @returns {Promise}
 */
module.exports = require('./curry2') (ptimeout);

function ptimeout(delayms, func, ...preboundargs) {

    return function timeoutpromise(...args) {
        
        const timedfunction = partial(func, ...preboundargs, ...args);

        const timeoutexecutor = timeoutexecutorfactory(delayms, timedfunction);

        return new Promise(timeoutexecutor);
    }
}

function timeoutexecutorfactory(delayms, timedfunction) {

    return function executor(resolve, reject) {

        function timerwrapper(func, ...args) {

            if( ! istimerrunning ) return;

            istimerrunning = false;

            cleartimeout();

            func(...args);
        }

        const resolvetimeoutpromise = wrap(timerwrapper, resolve);
        const rejecttimeoutpromise = wrap(timerwrapper, reject);

        const ontimeout = partial(rejectwithaborterror, rejecttimeoutpromise);
        const cleartimeout = timeout(delayms, ontimeout);
        
        let istimerrunning = true;

        papply(timedfunction)
            .then(resolvetimeoutpromise)
            .catch(rejecttimeoutpromise)
            .finally(cleartimeout);
    }
}

function rejectwithaborterror(reject) {

    const error = new Error(TIMEOUTERROR);
    error.name = ABORTERROR_NAME;

    reject(error);
}