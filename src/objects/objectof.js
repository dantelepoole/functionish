/**
 * @module objects/objectof
 */

'use strict';

const TYPE_STRING = 'string';

const curry = require('../curry');

const notarray = require('../types/notarray)');

/**
 * to do
 * 
 * `objectof()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `objectof()`</caption>
 * 
 * to do
 * 
 * @function objectof
 * @param {(string|string[])} key The property key or array of property keys to populate the object with
 * @param {...any[]} values The value or values to assign to the object's property or properties
 * @return {object}
 */
function objectof(key, ...values) {

    return (typeof key === TYPE_STRING || notarray(key))
         ? { [key]:values[0] }
         : populate({}, key, values)
}

function populate(target, keys, values) {

    for(let index = 0; index < keys.length; index += 1) target[ keys[index] ] = values[index];

    return target;
}
module.exports = curry(1, objectof);