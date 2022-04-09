/**
 * Create a shallow copy of *source*. If *source* has a primitive type (number, boolean, string, symbol, null, bigint
 * and undefined), *source* itself is returned. If *source* is an array, its `slice()`-method is called. Otherwise,
 * the copy is made by creating a new object with *source*'s prototype and its property descriptors. 
 * 
 * Since an object's copy is created by copying the *source*'s property descriptors, this also means that the copy will
 * get *source*'s Getter and Setter methods, as well. This could lead to unintended behaviour if those methods rely on
 * any variables not directly associated with *source* itself (*this*).
 * 
 * @module copy
 * @param {any} source The value to copy
 * @returns A shallow copy of *source*
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
 */

'use strict';

const isarray = require('./lib/isarray');
const isprimitive = require('./lib/isprimitive');

module.exports = function copy(source) {

    return isarray(source) ? source.slice()
         : isprimitive(source) ? source
         : Object.create( Object.getPrototypeOf(source), Object.getOwnPropertyDescriptors(source) );
    
}
