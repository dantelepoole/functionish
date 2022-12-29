/**
 * @module collections/head
 */

'use strict';

/**
 * Return the first item in *indexable* or `undefined` if *indexable* is empty.
 * 
 * @example
 * const head = require('functionish/head');
 * 
 * head([1,2,3]); // returns 1
 * head([]); // returns `undefined`
 * head('foobar'); // returns 'f'
 * 
 * @func head
 * @param {indexable} indexable An indexable or iterable object
 * @returns {any}
 */
module.exports = function head(indexable) {
    return indexable[0];
}
