'use strict';

const isdeepequal = require('util').isDeepStrictEqual;

/**
 * Alias for the `isDeepStrictEqual()` method of Node's `util` package.
 * 
 * @module isdeepequal
 */
module.exports = require('./curry2')(isdeepequal );
