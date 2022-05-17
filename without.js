/**
 * @module without
 */
'use strict';

const isarray = require('./isarray');
const isobject = require('./isobject');

/**
 * Return a copy of *list* with *values* removed. Comparison is performed using strict equality.
 * 
 * If *list* is an array, a new array is returned containing all original items except those
 * contained in *values*. If *list* is an object, a copy of *list* is returned without the properties whose names are
 * contained *values*. Otherwise, it returns *list* itself.
 * 
 * `without()` is curried by default.
 * 
 * @example
 *     
 * const without = require('functionish/without');
 * 
 * without( [1,2], [1,2,3] ); // returns [3]
 * without( 1, [1,2,3] ); // returns [2,3]
 * without( [], [1,2,3] ); // returns [1,2,3]
 * 
 * without( 'a', {a:'aaa', b:'bbb'} ); // returns {b:'bbb'}
 * without( ['a','b'], {a:'aaa', b:'bbb'} ); // returns {}
 * without( [], {a:'aaa', b:'bbb'} ); // returns {a:'aaa', b:'bbb'}
 * 
 * @func without
 * @param {any[]} values The array of values to remove from *list*
 * @param {(any[]|object)} list The source to remove *values* from
 * @returns {(any[]|object)}
 */
module.exports = require('./curry2')(

    function without(values, list) {

        const skipkeys = new Set(values);

        return isarray(list) ? list.filter( notpresent(skipkeys) ) 
             : isobject(list) ? objectwithout( skipkeys, Object(list) )
             : list;
    }
)

function notpresent(keyset) {

    return function _notincludes(key) {
        return ! keyset.has(key);
    }
}

function objectwithout(skipkeyset, source) {

    const target = {};

    Object.keys(source).forEach(
        key => skipkeyset.has(key) || (target[key] = source[key])
    )

    return target;
}