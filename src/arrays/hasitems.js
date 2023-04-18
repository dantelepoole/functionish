/**
* @module arrays/hasitems
*/

'use strict';

/**
 * Return `true` if *collection* has a numeric `length` or `size` property that is not `0`. Otherwise, return `false`.
 * 
 * This function is the counterpart of {@link module:arrays/isempty isempty()} and functions identically
 * to {@link module:arrays/notempty notempty()}.
 * 
 * @example <caption>Example usage of `hasitems()`</caption>
 * 
 * const {hasitems} = require('functionish/arrays');
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
 * @param {any} collection The collection to check
 * @returns {boolean}
 */
function hasitems(collection) {
    
    const itemcount = (collection.length ?? collection.size ?? NaN);

    return (itemcount > 0);
}

module.exports = hasitems;