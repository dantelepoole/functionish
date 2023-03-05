/**
 * @module arrays/sever
 */

'use strict';

const curry = require('../curry');

/**
 * [to do]
 * 
 * @example
 * 
 * [to do]
 * 
 * @function sever
 * @param {number} index The index to sever *array* at
 * @param {any[]} array The array to sever
 * @returns {any[][]}
 */
function sever(index, array) {
    
    const left = array.slice(0, index);
    const right = array.slice(index);

    return [left, right];
}

module.exports = curry(1, sever);
