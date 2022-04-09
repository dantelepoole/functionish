'use strict';

/**
 * Return `true` if and only if *value* is falsy or *value* has a `length` property that is strictly equal to `0`.
 * 
 * @module lib/isempty
 * @ignore
 * @see {@link module:lib/hasitems hasitems()}
 * @param {any} value The value to check
 * @returns {boolean}
 * @example
 * 
 * const isempty = require('functionish/isempty');
 * 
 * isempty( [] ); //  returns true
 * isempty( '' ); // returns true
 * isempty( null ); // returns true
 * isempty( 0 ); // returns true
 * isempty( false ); // returns true
 *     
 * isempty( {} ); // returns false
 * isempty( new Map() ); // returns false
 * isempty( 1 ); // returns false
 * isempty( true ); // returns false
 * isempty( [undefined] ); // returns false
 * isempty( ' ' ); // returns false
 * 
 */
module.exports = function isempty(value) {
    return (!value || value.length === 0)
}