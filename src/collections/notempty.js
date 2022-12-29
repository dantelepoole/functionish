/**
 * @module collections/notempty
 */

'use strict';

const TYPE_NUMBER = 'number';

/**
 * Return `true` if *countable* has a numeric `length` or `size` property that is greater than `0`. This function is the
 * counterpart of {@link module:isempty isempty()} and an alias for {@link module:hasitems hasitems()}.
 * 
 * @example
 * 
 * const notempty = require('functionish/collections/notempty');
 * 
 * notempty( [1,2,3] ); //  returns true
 * notempty( 'foobar' ); // returns true
 * notempty( ' ' ); // returns true
 * notempty( [null] ); // returns true
 * notempty( new Map([[1],[2]]) ); // returns true
 * notempty( new Set([1,2,3]) ); // returns true  
 * 
 * notempty( [] ); //  returns false
 * notempty( '' ); // returns false
 * notempty( new Map() ); // returns false
 * notempty( new Set() ); // returns false    
 * 
 * notempty( {} ); // returns false
 * notempty( 0 ); // returns false
 * notempty( null ); // returns false
 * 
 * @func notempty
 * @see {@link module:isempty isempty()}
 * @see {@link module:hasitems hasitems()}
 * @param {any} countable An object with a `length` or `size` property
 * @returns {boolean}
 * 
 */
module.exports = function notempty(countable) {
    return ((countable.length ?? countable.size) > 0);
}