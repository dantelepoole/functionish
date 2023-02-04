/**
 * @module arrays/head
 */

'use strict';

/**
 * Return the first item in *indexable* or `undefined` if *indexable* is empty.
 * 
 * @example <caption>Example usage of `head()`</caption>
 * 
 * const {head} = require('functionish/arrays');
 * 
 * head([1,2,3]); // returns 1
 * head([]); // returns `undefined`
 * head('foobar'); // returns 'f'
 * 
 * @function head
 * @param {indexable} indexable An indexable object
 * @returns {any}
 */
function head(indexable) {
    return indexable[0];
}

module.exports = head;