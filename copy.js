/**
 * @module copy
 */

'use strict';

const isarray = require('./isarray');
const isnull = require('./isnull');
const isprimitive = require('./isprimitive');

/**
 * Create a shallow copy of *source*. If *source* has a primitive type (number, boolean, string, null, bigint
 * and undefined), *source* itself is returned. If *source* is an array, its `slice()`-method is called. Otherwise,
 * the copy is made by creating a new object with *source*'s prototype and then copying *source*'s own enumerable
 * properties to the copy using {@link external:Object.assign Object.assign()}. 
 * 
 * @example
 * 
 * const copy = require('functionish/copy');
 * 
 * const source = { firstname:'Hari', lastname:'Seldon' }
 * const clone = copy(source);
 * 
 * console.log(clone); // prints "{ firstname:'Hari', lastname:'Seldon' }"
 * Object.is(source,clone); // returns false
 * require('util').isDeepStrictEqual(source, clone); // returns true
 * 
 * @func copy
 * @param {any} source The value to copy
 * @returns A shallow copy of *source*
 */

module.exports = function copy(source) {

    return isarray(source) ? source.slice()
         : isprimitive(source) || isnull(source) ? source
         : copyobject(source);
}

function copyobject(source) {

    const prototype = Object.getPrototypeOf(source);
    const clone = Object.create(prototype);
    
    return Object.assign(clone, source);
}