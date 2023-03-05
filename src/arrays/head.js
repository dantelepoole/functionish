/**
 * @module arrays/head
 */

'use strict';

/**
 * Return the first item in *array* or `undefined` if *array* is empty.
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
 * @param {any[]} array The array to return the first item from
 * @returns {any}
 */
function head(array) {
    return array[0];
}

module.exports = head;