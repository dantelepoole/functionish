/**
 * @module preject
 */

'use strict';

/**
 * Alias for {@link external:Promise.reject Promise.reject()}.
 * 
 * @func preject
 * @param {any} reason The reason for the promise rejection
 * @returns {Promise} A Promise that rejects with the given reason.
 * @see {@link external:Promise.reject Promise.reject()}
 */
module.exports = Promise.reject.bind(Promise);