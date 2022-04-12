/**
 * @module reverse
 */

'use strict';

const isarray = require('./isarray');
const isdefined = require('./isdefined');

/**
 * Return a copy of *list* in reverse order. If *list* is not an array, a single-item array
 * containing only *list* is returned, unless *list* is `null`, `undefined` or `NaN`, in which case an empty array
 * is returned.
 * 
 * @func reverse
 * @param {(array|iterable|any)} list 
 * @returns {any[]}
 */
module.exports = function reverse(list) {

    return isarray(list) ? list.slice().reverse()
         : isdefined(list) ? [list]
         : [];
}
