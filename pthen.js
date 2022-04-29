/**
 * @module pthen
 */

'use strict';

/**
 * Functional variant of {@link external:Promise.prototype.then Promise.prototype.then()}. Pass *onresolve* to
 * *promise*'s `then()` method and return the resulting Promise.
 * 
 * `pmap()` is curried by default.
 * 
 * @func pthen
 * @see {@link external:Promise.prototype.then Promise.prototype.then()}
 * @see {@link module:pcatch pcatch()}
 * @see {@link module:pfinally pfinally()}
 * @param {function} onresolve The function to pass to *promise*'s `then()` method
 * @param {Promise} promise The promise the attach *onresolve* to
 * @returns {Promise}
 */
module.exports = require('./curry2')(

    function pthen(onresolve, promise) {
        return promise.then(onresolve);
    }
)