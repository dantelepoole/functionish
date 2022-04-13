/**
 * @module without
 */
'use strict';

const filter = require('./filter');
const isarray = require('./isarray');
const isprimitive = require('./isprimitive');

const asobject = Object;

/**
 * Return a copy of *list* with *values* removed. Comparison is performed using strict equality.
 * 
 * If *list* is an array, a new array is returned containing all original items except those
 * contained in *values*. If *list* is `null` or a primitive, *list* itself is returned unless it matches any item
 * in *values*, in which case `undefined` is returned. If *list* is an object, a copy of *list* is returned without
 * the properties whose names are contained *values*. 
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
 * without( [1,2], 2 ); // returns `undefined`
 * without( [1,2], 3 ); // returns 3
 * without( [1,2], null ); // returns `null`
 * without( null, null ); // returns `undefined`
 * 
 * @func without
 * @param {any[]} values The array of values to remove from *list*
 * @param {(any[]|object)} list The source to remove *values* from
 * @returns {(any[]|object)}
 */
module.exports = require('./curry2')(

    function without(values, list) {

        return isarray(list) ? filter( notincludes(values), list )
             : isprimitive(list) ? (values.includes(list) ? undefined : list)
             : objectwithout( values, asobject(list) );
    }
)

function notincludes(list) {

    return function _notincludes(value) {
        return ! list.includes(value);
    }
}

function objectwithout(keys, object) {

    const target = {};
    const shouldcopy = notincludes(keys);

    Object.keys(object).forEach(
        key => shouldcopy(key) && (target[key] = object[key])
    )

    return target;
}