/**
 * @module includeslist
 */

'use strict';

/**
 * Compare *value* for strict equality with each item produced by *iterable* and return `true` when the first item is
 * found that maches *value*. If no item matches *value*, return `false`.
 * 
 * Comparison is performed using Javascript's `Object.is()` method.
 * 
 * `includeslist()` is curried by default with binary arity.
 * 
 * @func includeslist
 * @param {any} value The value to look for
 * @param {iterable} iterable An iterable producing the items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includeslist(value, iterable) {

        for( const item of iterable ) if( Object.is(value, item) ) return true;

        return false;
    }
)