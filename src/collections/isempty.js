/**
 * @module collections/isempty
 */

'use strict';

/**
 * Return `true` if and only if *countable* has a `length` or `size` property that is strictly equal to `0`. 
 * 
 * @example
 * 
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
 * @param {any} countable The value to check
 * @returns {boolean}
 * 
 */
module.exports = function isempty(countable) {
    return ((countable.length ?? countable.size) === 0);
}