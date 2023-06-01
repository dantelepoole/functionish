/**
 * @module tryfinally
 */

'use strict';

const INDEX_DATA = 1;
const INDEX_ERROR = 0;
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

    const curryarity = func.curryarity - partialargs.length;

    return (curryarity > 0)
         ? curry(curryarity, _tryfinally)
         : _tryfinally;
         
    function _tryfinally(...args) {

        const result = safefunc.call(this, ...args);

        const finallyresult = onfinally.call(this, result[INDEX_ERROR], result[INDEX_DATA]);

        return (finallyresult !== FINALLY_RESULT_NONE) ? finallyresult
             : result[INDEX_ERROR] ? raise(result[INDEX_ERROR])
             : result[INDEX_DATA];
    }
}

module.exports = curry(2, tryfinally);