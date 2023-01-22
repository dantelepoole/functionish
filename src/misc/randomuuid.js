/**
 * @module misc/randomuuid
 */

'use strict';

/**
 * Alias for the `randomUUID()` method of NodeJS's `crypto` package. Generate and return a random
 * version 4 UUID.
 * 
 * @function randomuuid
 * @returns {string}
 */
module.exports = require('crypto').randomUUID;