/**
 * @module pthen
 */

'use strict';

/**
 * Functional variant of {@link external:Promise.prototype.then Promise.prototype.then()}. Pass *func* to
 * *promise*'s `then()` method and return the resulting Promise.
 * 
 * `pmap()` is curried by default.
 * 
 * @func pthen
 * @see {@link external:Promise.prototype.then Promise.prototype.then()}
 * @see {@link module:pcatch pcatch()}
 * @see {@link module:pfinally pfinally()}
 * @param {function} func The function to pass to *promise*'s `then()` method
 * @param {Promise} promise The promise the attach *func* to
 * @returns {Promise}
 */
module.exports = require('./curry2')(

    function pthen(func, promise) {
        return promise.then(func);
    }
)