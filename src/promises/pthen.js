/**
 * @module promises/pthen
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Functional variant of {@link external:Promise.prototype.then Promise.prototype.then()}, except it
 * only accepts a resolve-handler (no reject-handler).
 * 
 * `pthen()` is curried by default with binary arity.
 * 
 * @function pthen
 * @param {function} resolvehandler The handler to call if *promise* resolves
 * @param {Promise} promise The promise to attach *resolvehandler* to
 * @returns {Promise}
 */
function pthen(resolvehandler, promise) {
    return promise.then(resolvehandler);
}

module.exports = curry2(pthen);