'use strict';

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');
const isequal = require('./isequal');

const hasincludesmethod = value => (typeof value?.includes === 'function');

/**
 * Functional variant of {@link external:Array.prototype.includes Array.prototype.includes()}. Return `true` if *value*
 * matches any item in *list* using strict equality, otherwise return `false`.
 * 
 * If *list* is neither an array nor an iterable object, but it has its own `includes()` method (e.g. a string), that
 * method is called. Otherwise, *value* is compared against *list* itself using strict equality and the result is
 * returned;
 * 
 * `includes()` is curried by default.
 * 
 * @module includes
 * @see {@link external:Array.prototype.includes Array.prototype.includes()}
 * @param {any} value The value to look for
 * @param {(array|iterable|any)} list The list of items to search
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    
    function includes(value, list) {

        return isarray(list) ? list.includes(value)
            : isiterable(list) ? iterableincludes(value, list)
            : hasincludesmethod(list) ? list.includes(value)
            : isequal(value, list);
    }
)

function iterableincludes(value, iterable) {

    const valueequals = isequal(value);

    for( const item of iterable ) if( valueequals(item) ) return true;

    return false;
}