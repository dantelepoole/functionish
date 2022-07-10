/**
 * @module ispromise
 */

'use strict';

/**
 * Alias for the `isPromise()` method of the types object of Node's `util`-package.
 * 
 * @func ispromise
 * @param {promise} promise The promise to check
 * @returns {boolean}
 */
module.exports = require('util').types.isPromise;