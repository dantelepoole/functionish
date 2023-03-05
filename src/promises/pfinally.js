/**
 * @module promises/pfinally
 */

'use strict';

const curry = require('../curry');

/**
 * Functional variant of {@link external:Promise.prototype.finally Promise.prototype.finally()}.
 * 
 * `pfinally()` is curried by default with unary arity.
 * 
 * @function pfinally
 * @param {function} onfinally The finally handler to call
 * @param {Promise} promise The promise to attach *onfinally* to
 * @returns {Promise}
 */
function pfinally(onfinally, promise) {
    return promise.finally(onfinally);
}

module.exports = curry(1, pfinally);