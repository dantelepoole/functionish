/**
 * @module collections/isempty
 */

'use strict';

/**
 * Return `true` if *collection* has a `length` or `size` property equal to `0` or
 * if *collection* has no such properties at all.
 * 
 * @example
 * const isempty = require('functionish/collections/isempty');
 * 
 * isempty( [] ); //  returns true
 * isempty( '' ); // returns true
 * isempty( new Map() ); // returns true
 * isempty( new Set() ); // returns true    
 * 
 * isempty( {} ); // returns false
 * isempty( 0 ); // returns false
 * isempty( null ); // returns false
 * isempty( [undefined] ); // returns false
 * isempty( ' ' ); // returns false
 * 
 * @func isempty
 * @see {@link module:hasitems hasitems()}
 * @param {any} collection The value to check
 * @returns {boolean}
 * 
 */
module.exports = function isempty(collection) {
    return ! (collection.length ?? collection.size ?? 0);
}