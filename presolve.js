/**
 * @module presolve
 */

'use strict';

/**
 * Alias for {@link external:Promise.resolve Promise.resolve()}.
 * 
 * @func presolve
 * @param {any} data The value that the promise should resolve to
 * @returns {Promise} A Promise that resolves with the given value.
 * @see {@link external:Promise.resolve Promise.resolve()}
 */
module.exports = Promise.resolve.bind(Promise);