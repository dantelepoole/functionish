/**
 * @module array
 */

'use strict';

const isarray = require('./isarray');
const isiterable = require('./isiterable');

/**
 * Return an array containing the items produced by *iterable* in order. If *iterable* is already an array, a shallow
 * copy of the array is returned.
 * 
 * If *iterable* is not an iterable object, a single-item array is returned containing *iterable* as the only item,
 * unless *iterable* is `undefined`, in which case an empty array is returned.
 * 
 * @func array
 * @param {iterable} [iterable] An iterable object that produces the items to populate the returned array with
 * @returns {any[]}
 */
module.exports = function array(iterable) {

    return isiterable(iterable) ? Array.from(iterable)
         : (iterable !== undefined) ? [iterable]
         : [];
}