/**
 * @module iserror
 */

'use strict';

/**
 * Alias for the `types.isNativeError()` method of Node's `util` package.
 * 
 * @func iserror
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = require('util').types.isNativeError;