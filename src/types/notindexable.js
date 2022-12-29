/**
 * @module types/notindexable
 */

'use strict';

const isindexable = require('./isindexable');
const not = require('./not');

/**
 * Return `true` if *value* is not an indexable object, otherwise return `false`. See 
 * {@link module:isindexable isindexable()} for details on what constitutes an indexable object.
 *  
 * @func notindexable
 * @see {@link module:isindexable isindexable()}
 * @param {any} value The value to check
 * @returns {boolean}
 */

module.exports = not(isindexable);