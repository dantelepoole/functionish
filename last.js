/**
 * @module last
 */

'use strict';

const isnumber = require('./isnumber');

/**
 * Return the last item in *iterable* or `undefined` if *iterable* is empty.
 * 
 * @func last
 * @param {iterable} iterable The iterable to get the last item from
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
module.exports = function last(iterable) {
    return isnumber(iterable?.length) ? iterable[iterable.length-1] : lastiterable(iterable);
}

function lastiterable(iterable) {

    let value = undefined;

    for(const item of iterable) value = item;

    return value;
}
