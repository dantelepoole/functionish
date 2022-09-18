/**
 * @module last
 */

'use strict';

const isnumber = require('./isnumber');

/**
 * Return the last item in *indexable* or `undefined` if *indexable* is empty or if it is not indexable.
 * 
 * @func last
 * @param {indexable} indexable The indexable object to retrieve the last item from
 * @returns {any}
 * @example
 *     
 * const last = require('functionish/last');
 * 
 * last([1,2,3]); // returns 3
 * last([]); // returns undefined
 * last('foobar'); // returns 'r'
 * 
 */
module.exports = function last(indexable) {
    return isnumber(indexable?.length) ? indexable[indexable.length - 1] : undefined;
}
