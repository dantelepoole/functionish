/**
 * @module slice
 */

const ERR_BAD_SLICABLE = `SliceError~The slicable has type %s. Expected an array, a string or a TypedArray.`;

'use strict';

const fail = require('./fail');
const isarray = require('./isarray');
const typeorclass = require('./typeorclass');

const istypedarray = require('util').types.isTypedArray;

const isslicable = x => (typeof x === 'string' || isarray(x) || istypedarray(x));

/**
 * Functional variant of the `slice()` method of Javascript strings, arrays and TypedArrays.
 * 
 * This function is overloaded:
 * 
 * 1. `slice(slicable)` : calls `slicable.slice()`
 * 2. `slice(start, slicable)` : calls `slicable.slice(start)`
 * 3. `slice(start, end, slicable)` : calls `slicable.slice(start, end)`
 * 
 * In each case, `slicable` must be either an array, a string or a TypedArray instance, otherwise an error is thrown.
 * 
 * This function also works with Node's `Buffer` instances, but be aware that `Buffer.slice()` does not return a 
 * shallow copy. Instead, the returned Buffer references the same memory as the (specified section) of the input
 * Buffer.
 * 
 * See {@link external:Array.prototype.slice Array.prototype.slice()} for details on the *start* and *end* parameters.
 * 
 * @func slice
 * @see {@link external:Array.prototype.slice Array.prototype.slice()}
 * @see {@link external:String.prototype.slice String.prototype.slice()}
 * @see {@link external:TypedArray.prototype.slice TypedArray.prototype.slice()}
 * @param {number} start The index of the first item to include in the slice
 * @param {number} end The index of the item *after* the last item to include in the slice
 * @param {(array|string|TypedArray)} slicable An array, a string or a TypedArray
 * @returns {any}
 */
module.exports = function slice(start, end, slicable) {

    if(arguments.length === 1) [start,end,slicable] = [0, Infinity, start];
    else if(arguments.length === 2) [start,end,slicable] = [start, Infinity, end];

    if( isslicable(slicable) ) return slicable.slice(start, end);

    fail(ERR_BAD_SLICABLE, typeorclass(slicable));
}
