/**
 * @module head
 */

'use strict';

const isindexable = require('./isindexable');

/**
 * Return the first item in *list* or `undefined` if *list* is empty. If *list* is not indexable, *list* itself is
 * returned.
 * 
 * @example
 *     
 * const head = require('functionish/head');
 * 
 * head([1,2,3]); // returns 1
 * head(1); // returns 1
 * head([]); // returns `undefined`
 * 
 * @func head
 * @param {(array|iterable|any)} list The list to get the first item from
 * @returns {any}
 */
module.exports = function head(list) {
    return isindexable(list) ? list[0] : list;
}