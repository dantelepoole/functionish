/**
 * @module misc/isequal
 */

'use strict';

const curry = require('./curry');

/**
 * Alias for {@link module:misc/is is()}.
 * 
 * `isequal()` is curried by default with unary arity.
 * 
 * @function isequal
 * @see {@link module:misc/is is()}
 * @param {any} a The value to compare with
 * @param {any} b The value to compare to
 * @returns {boolean}
 */
const isequal = require('./is');

module.exports = curry(1, isequal);