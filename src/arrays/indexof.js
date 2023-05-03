/**
 * @module arrays/indexof
 */

'use strict';

const INDEX_NOT_FOUND = -1;

const curry = require('../curry');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `indexof()`</caption>
 * 
 * to do
 * 
 * @function indexof
 * @param {any[]} array The array to search
 * @param {any} targetvalue The value to look for
 * @returns {number}
 */
function indexof(array, targetvalue) {

    for(let index = 0; index < array.length; index += 1) if(targetvalue === array[index]) return index;

    return INDEX_NOT_FOUND;
}

module.exports = curry(1, indexof);