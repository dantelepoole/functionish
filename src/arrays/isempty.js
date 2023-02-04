/**
 * @module arrays/isempty
 */

'use strict';

/**
 * Return `true` if *indexable* has a `length` or `size` property equal to `0` or
 * if *indexable* has no such properties at all.
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
 * @see {@link module:hasitems hasitems()}
 * @param {any} indexable The value to check
 * @returns {boolean}
 * 
 */
function isempty(indexable) {
    return ! (indexable.length ?? indexable.size ?? 0);
}

module.exports = isempty;