/**
 * @module arrays/split
 */

'use strict';

const TYPE_STRING = 'string';

const curry = require('../curry');

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

    return (typeof array === TYPE_STRING) ? array.split(index)
         : (index >= 0) ? [ array.slice(0, index), array.slice(index) ] 
         : [ array.slice(0, index + array.length), array.slice(index + array.length)];
}

module.exports = curry(1, split);
