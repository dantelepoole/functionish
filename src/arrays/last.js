/**
 * @module collections/last
 */

'use strict';

/**
 * Return the last item in *collection* or `undefined` if *collection* is empty.
 * 
 * @example
 * const last = require('functionish/collections/last');
 * 
 * last([1,2,3]); // returns 3
 * last([]); // returns undefined
 * last('foobar'); // returns 'r'
 * 
 * @function last
 * @param {indexable} collection The indexable object to retrieve the last item from
 * @returns {any}
 */
module.exports = function last(collection) {
    return collection[ collection.length - 1 ];
}
