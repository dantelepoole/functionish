/**
 * @module promises/pthen
 */

'use strict';

const curry = require('../curry');

/**
 * Functional variant of {@link external:Promise.prototype.then Promise.prototype.then()}, except it
 * only accepts a resolve-handler (no reject-handler).
 * 
 * `pthen()` is curried by default with unary arity.
 * 
 * @function pthen
 * @param {function} resolvehandler The handler to call if *promise* resolves
 * @param {Promise} promise The promise to attach *resolvehandler* to
 * @returns {Promise}
 */
function pthen(resolvehandler, promise) {
    return promise.then(resolvehandler);
}

module.exports = curry(1, pthen);