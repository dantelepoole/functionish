/**
 * @module trycatchfinally
 */

'use strict';

const curry = require('./curry');
const raise = require('./misc/raise');
const safe = require('./safe');
const trycatch = require('./trycatch');

/**
 * to do
 * 
 * @example <caption>Example usage of `trycatchfinally()`</caption>
 * 
 * to do
 * 
 * @function trycatchfinally
 * @param {function} onfinally to do
 * @param {function} func The function to run
 * @returns {any}
 */
function trycatchfinally(onerror=raise, onfinally, func, ...partialargs) {

    const safefunc = safe(
        trycatch(onerror, func, ...partialargs)
    );

    return function _trycatchfinally(...args) {

        const result = safefunc.call(this, ...args);

        const finallyresult = onfinally.call(this, result.error, result.data);

        return (finallyresult !== RESULT_REPEAT) ? finallyresult
             : result.iserror ? raise(result.error)
             : result.data;
    }
}

module.exports = curry(2, trycatchfinally);