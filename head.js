/**
 * @module head
 */

'use strict';

/**
 * Return the first item in *list* or `undefined` if *list* is empty.
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
 * @param {any[]} list The array of items to retrieve the first item from.
 * @returns {any}
 */
module.exports = function head(list) {
    return list[0];
}