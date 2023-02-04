/**
* @module arrays/hasitems
*/

'use strict';

/**
 * Return `true` if *collection* has a numeric `length` or `size` property that is not `0`. If
 * *collection* has no such properties, `false` is returned.
 * 
 * This function is the counterpart of {@link module:types/isempty isempty()} and functions identically
 * to {@link module:types/notempty notempty()}.
 * 
 * @example <caption>Example usage of `hasitems()`</caption>
 * 
 * const {hasitems} = require('functionish/arraya');
 * 
 * hasitems( [1,2,3] ); //  returns true
 * hasitems( 'foobar' ); // returns true
 * hasitems( ' ' ); // returns true
 * hasitems( [null] ); // returns true
 * hasitems( new Map([[1],[2]]) ); // returns true
 * hasitems( new Set([1,2,3]) ); // returns true  
 * 
 * hasitems( [] ); //  returns false
 * hasitems( '' ); // returns false
 * hasitems( new Map() ); // returns false
 * hasitems( new Set() ); // returns false    
 * hasitems( {} ); // returns false
 * 
 * @function hasitems
 * @see {@link module:types/isempty isempty()}
 * @see {@link module:types/notempty notempty()}
 * @param {collection} collection The collection to check
 * @returns {boolean}
 */
function hasitems(collection) {
    return !! (collection.length ?? collection.size ?? 0);
}

module.exports = hasitems;