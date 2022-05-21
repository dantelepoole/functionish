/**
 * @module without
 */
'use strict';

/**
 * Return a shallow copy of the *source* object without the properties whose keys are present in *keys*.
 * 
 * `without()` is curried by default.
 * 
 * @example
 *     
 * const without = require('functionish/without');
 * 
 * without( ['a'], {a:'aaa', b:'bbb'} ); // returns {b:'bbb'}
 * without( ['a','b'], {a:'aaa', b:'bbb'} ); // returns {}
 * 
 * @func without
 * @param {(any[]|iterable)} keys A list of keys of the properties to remove from *source*
 * @param {object} source The object to remove the properties from
 * @returns {object} A shallow copy of *source* with the specified properties
 */
module.exports = require('./curry2')(without)

function without(keys, source) {

    const target = {};
    const excludedkeys = new Set(keys);

    Object.keys(source).forEach(
        key => excludedkeys.has(key) || (target[key] = source[key])
    )

    return target;
}