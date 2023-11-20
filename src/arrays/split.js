/**
 * @module arrays/split
 */

'use strict';

const curry = require('../curry');
const isstring = require('../types/isstring');

/**
 * [to do]
 * 
 * @example
 * 
 * [to do]
 * 
 * @function split
 * @param {number} index The index to split *array* at
 * @param {any[]} array The array to split
 * @returns {any[][]}
 */
function split(index, array) {

    return isstring(array)
         ? array.split(index)
         : [ array.slice(0, index), array.slice(index) ];
}

module.exports = curry(1, split);
