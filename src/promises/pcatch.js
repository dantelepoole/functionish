/**
 * @module promises/pcatch
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Functional variant of {@link external:Promise.prototype.catch Promise.prototype.catch()}.
 * 
 * `pcatch()` is curried by default with binary arity.
 * 
 * @function pcatch
 * @param {function} rejecthandler The handler function to call if *promise* rejects
 * @param {Promise} promise The promise to attach *rejecthandler* to
 * @returns {Promise}
 */
function pcatch(rejecthandler, promise) {
    return promise.catch(rejecthandler);
}

module.exports = curry2(pcatch);