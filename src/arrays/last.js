/**
 * @module collections/last
 */

'use strict';

/**
 * Return the last item in *array* or `undefined` if *array* is empty.
 * 
 * @example
 * const last = require('functionish/arrays/last');
 * 
 * last([1,2,3]); // returns 3
 * last([]); // returns undefined
 * last('foobar'); // returns 'r'
 * 
 * @function last
 * @param {indexable} array The array to retrieve the last item from
 * @returns {any}
 */
function last(array) {
    return array[ array.length - 1 ];
}

module.exports = last;
