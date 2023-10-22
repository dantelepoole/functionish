/**
 * @module misc/isempty
 */

'use strict';

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
 * @see {@link module:misc/hasitems hasitems()}
 * @param {any} collection The collection to check
 * @returns {boolean}
 * 
 */
function isempty(collection) {
    return (collection.length ?? collection.size) === 0;
}

module.exports = isempty;