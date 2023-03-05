/**
 * @module promises/pdebounce
 */

'use strict';

const ERROR_DEBOUNCE = 'debounce';
const MODE_LEADING = 'leading';
const TIMER_NONE = undefined;

const compose = require('../compose');
const curry = require('./curry');
const defer = require('./defer');
const noop = require('./noop');

const funcexecutorfactory = func => (resolve, reject) => partial(fulfill, func, resolve, reject);

/**
 * to do
 * 
 * @function pdebounce
 * @param {string} mode The debounce mode
 * @param {number} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @returns {function}
 */
function pdebounce(mode, delayms, func) {

    return (mode === MODE_LEADING)
         ? pdebounceleading(delayms, func)
         : pdebouncetrailing(delayms, func);
}

function fulfill(func, resolve, reject, ...args) {

    try {
        
        const result = func(...args);
        resolve(result);

    } catch(error) {
        reject(error);
    }
}

function pdebouncetrailing(delayms, func) {

    const funcexecutor = funcexecutorfactory(func);

    let cancelpendingoperation = noop;
    const clearpendingoperation = () => (cancelpendingoperation = noop);

    let timeoutid = TIMER_NONE;

    return function _pdebouncetrailing(...args) {

        cancelpendingoperation();

        return new Promise(executor);

        function executor(resolve, reject) {

            timeoutid = setTimeout(
                compose(clearpendingoperation, funcexecutor(resolve, reject)),
                delayms,
                ...args
            )

            cancelpendingoperation = compose(
                defer(reject, ERROR_DEBOUNCE),
                defer(clearTimeout, timeoutid)
            )
        }
    }
}

function pdebounceleading(delayms, func) {

    const funcexecutor = funcexecutorfactory(func);

    let timeoutid = TIMER_NONE;
    const istimerrunning = () => (timeoutid !== TIMER_NONE);
    const resettimeout = () => (timeoutid = TIMER_NONE);

    return function _pdebounceleading(...args) {

        return istimerrunning()
             ? Promise.reject(ERROR_DEBOUNCE)
             : new Promise(executor);

        function executor(resolve, reject) {
        
            timeoutid = setTimeout(
                compose(resettimeout, funcexecutor(resolve, reject)),
                delayms,
                ...args
            )
        }

      }

}

module.exports = curry(2, pdebounce);