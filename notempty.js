/**
 * @module notempty
 */

'use strict';

const and = require('./and');
const isgreaterthan = require('./isgreaterthan');
const isnumber = require('./isnumber');

const ispositivenumber = and(isgreaterthan(0), isnumber);

/**
 * Return `true` if *value* has a numeric `length` or `size` property that is greater than `0`. This function is the
 * counterpart of {@link module:isempty isempty()} and an alias for {@link module:hasitems hasitems()}.
 * 
 * @example
 * 
 * const notempty = require('functionish/notempty');
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
 * @param {any} value The value to check
 * @returns {boolean}
 * 
 */
module.exports = function notempty(value) {
    return ispositivenumber(value?.length ?? value?.size);
}