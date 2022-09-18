/**
* @module hasitems
*/

'use strict';

const and = require('./and');
const isnumber = require('./isnumber');
const isgreaterthan = require('./isgreaterthan');

const ispositive = isgreaterthan(0);
const ispositivenumber = and(isnumber, ispositive);

/**
 * Return `true` if *value* has a numeric `length` or `size` property that is greater than `0`. This function is the
 * counterpart of {@link module:isempty isempty()} and an alias for {@link module:notempty notempty()}.
 * 
 * @example
 * 
 * const isempty = require('functionish/isempty');
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
 * 
 * hasitems( {} ); // returns false
 * hasitems( 0 ); // returns false
 * hasitems( null ); // returns false
 * 
 * @func hasitems
 * @see {@link module:isempty isempty()}
 * @see {@link module:notempty notempty()}
 * @param {any} value The value to test
 * @returns {boolean}
 */
module.exports = function hasitems(value) {
    return ispositivenumber(value?.length ?? value?.size);
}
