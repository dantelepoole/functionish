/**
 * @module isempty
 */

'use strict';

/**
 * Return `true` if and only if *value* has a `length` or `size` property that is strictly equal to `0`. 
 * 
 * @example
 * 
 * const isempty = require('functionish/isempty');
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
 * @param {any} value The value to check
 * @returns {boolean}
 * 
 */
module.exports = function isempty(value) {
    return (value?.length ?? value?.size) === 0;
}