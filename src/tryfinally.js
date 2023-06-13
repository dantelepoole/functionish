/**
 * @module tryfinally
 */

'use strict';

const ERROR_NONE = null;
const FINALLY_RESULT_NONE = undefined;

const curry = require('./curry');
const raise = require('./misc/raise');
const safe = require('./safe');
const trycatch = require('./trycatch');

/**
 * to do
 * 
 * @example <caption>Example usage of `tryfinally()`</caption>
 * 
 * to do
 * 
 * @function tryfinally
 * @param {function} onfinally to do
 * @param {function} func The function to run
 * @returns {any}
 */
function tryfinally(onerror=raise, onfinally, func, ...partialargs) {

    const safefunc = safe(
        trycatch(onerror, func, ...partialargs)
    )

    return function _tryfinally(...args) {

        const [error, data] = safefunc.call(this, ...args);

        const finallyresult = onfinally.call(this, error, data);

        return (finallyresult !== FINALLY_RESULT_NONE) ? finallyresult
             : (error === ERROR_NONE) ? data
             : raise(error);
    }
}

module.exports = curry(2, tryfinally);