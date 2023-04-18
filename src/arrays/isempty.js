/**
 * @module arrays/isempty
 */

'use strict';

/**
 * Return `true` if *indexable* has a `length` or `size` property equal to `0`. Otherwise, return `false`.
 * 
 * This function is the counterpart of {@link module:arrays/isempty isempty()} and 
 * {@link module:arrays/hasitems hasitems()}.
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
 * @see {@link module:arrays/isempty isempty()}
 * @param {any} collection The collection to check
 * @returns {boolean}
 * 
 */
function isempty(collection) {

    const itemcount = (collection.length ?? collection.size ?? NaN);

    return (itemcount === 0);
}

module.exports = isempty;