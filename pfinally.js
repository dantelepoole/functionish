/**
 * @module pfinally
 */

'use strict';

/**
 * Functional variant of {@link external:Promise.prototype.finallly Promise.prototype.finally()}. Pass *finallyhandler*
 * to *promise*'s `finally()` method and return the resulting Promise.
 * 
 * `pcatch()` is curried by default.
 * 
 * @func pfinally
 * @see {@link external:Promise.prototype.finally Promise.prototype.finally()}
 * @see {@link module:pmap pmap()}
 * @see {@link module:pcatch pcatch()}
 * @param {function} finallyhandler The function to pass to *promise*'s `finally()` method
 * @param {Promise} promise The promise the attach *finallyhandler* to
 * @returns {Promise}
 */
module.exports = require('./curry2')(

    function pfinally(finallyhandler, promise) {
        return promise.finally(finallyhandler);
    }
)