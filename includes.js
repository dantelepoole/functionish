/**
 * @module includes
 */

'use strict';

/**
 * Functional variant of {@link external:Array.prototype.includes Array.prototype.includes()}. If *iterable* has a
 * `includes()` method, call it with *value* and return the result. Otherwise, assume *iterable* is iterable and compare
 * *value* to each item it produces until a match is found. If no match is found, return `false`.
 * 
 * Value comparison is performed by {@link external:Object#is Object.is()}.
 * 
 * `includes()` is curried by default.
 * 
 * @func includes
 * @see {@link external:Array.prototype.includes Array.prototype.includes()}
 * @param {any} value The value to look for
 * @param {iterable} iterable An iterable producing the items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, iterable) {

        return (typeof iterable?.includes === 'function') ? iterable.includes(value) 
             : includesiterable(value, iterable);
    }
)

function includesiterable(value, iterable) {

    for( const item of iterable ) if( Object.is(value, item) ) return true;

    return false;
}