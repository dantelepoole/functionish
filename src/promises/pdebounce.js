/**
 * @module promises/pdebounce
 */

'use strict';

const ERROR_DEBOUNCE = 'debounce';
const MODE_IMMEDIATE = 'immediate';

const compose = require('../compose');
const curry3 = require('./curry3');
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

    if (mode && mode === MODE_IMMEDIATE) return pdebounceimmediate(delayms, func);

    const funcexecutor = funcexecutorfactory(func);

    let cancelpendingoperation = noop;
    const clearpendingoperation = () => (cancelpendingoperation = noop);

    let timeoutid = undefined;

    return function _pdebounce(...args) {

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

function fulfill(func, resolve, reject, ...args) {

    try {
        
        const result = func(...args);
        resolve(result);

    } catch(error) {
        reject(error);
    }
}

function pdebounceimmediate(delayms, func) {

    const funcexecutor = funcexecutorfactory(func);

    let timeoutid = undefined;
    const istimerrunning = () => (timeoutid !== undefined);
    const resettimeout = () => (timeoutid = undefined);

    return function _pdebounceimmediate(...args) {

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

module.exports = curry3(pdebounce);