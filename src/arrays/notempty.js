/**
 * @module arrays/notempty
 */

'use strict';

const hasitems = require('./hasitems');

/**
 * Return `true` if *collection* has a numeric `length` or `size` property that is not `0`. If
 * *collection* has no such properties and *collection* is iterable, return `true` if *collection*
 * has at least one item.
 * 
 * This function is the counterpart of {@link module:arrays/isempty isempty()} and functions identically
 * to {@link module:arrays/hasitems hasitems()}.
 * 
 * @example
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
 * @function notempty
 * @see {@link module:types/isempty isempty()}
 * @see {@link module:thypes/hasitems hasitems()}
 * @param {collection} collection The collection to check
 * @returns {boolean}
 * 
 */
function notempty(collection) {
    return hasitems(collection)
}

module.exports = notempty;