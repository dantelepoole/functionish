/**
 * @module misc/notequal
 */

'use strict';

/**
 * Alias for {@link module:misc/isnot isnot()}.
 * 
 * @function notequal
 * @see {@link module:misc/isnot isnot()}
 * @param {any} a The value to compare with
 * @param {any} b The value to compare to
 * @returns {boolean}
 */
const notequal = require('./isnot');

module.exports = notequal;