'use strict';

const isarray = require('./lib/isarray');
const isdefined = require('./lib/isdefined');
const isiterable = require('./lib/isiterable');

/**
 * Return a copy of *list* in reverse order. If *list* is neither an array nor an iterable object, a single-item array
 * containing only *list* is returned, unless *list* is `null`, `undefined` or `NaN`, in which case an empty array
 * is returned.
 * 
 * @module reverse
 * @param {(array|iterable|any)} list 
 * @returns {any[]}
 */
module.exports = function reverse(list) {

    return isarray(list) ? list.slice().reverse()
         : isiterable(list) ? [...list].reverse()
         : isdefined(list) ? [list]
         : [];
}
