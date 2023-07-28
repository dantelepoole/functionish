/**
 * @module arrays/isempty
 */

'use strict';

const ZERO_COUNT = 0;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `isempty()`</caption>
 * 
 * const { isempty } = require('functionish/arrays');
 * 
 * isempty( [] ); //  returns true
 * isempty( '' ); // returns true
 * isempty( new Map() ); // returns true
 * isempty( new Set() ); // returns true    
 * 
 * isempty( {} ); // returns false
 * isempty( [undefined] ); // returns false
 * isempty( ' ' ); // returns false
 * 
 * @function isempty
 * @see {@link module:arrays/hasitems hasitems()}
 * @see {@link module:arrays/isempty isempty()}
 * @param {any} collection The collection to check
 * @returns {boolean}
 * 
 */
function isempty(collection) {
    return (ZERO_COUNT === (collection.length ?? collection.size));
}

module.exports = isempty;