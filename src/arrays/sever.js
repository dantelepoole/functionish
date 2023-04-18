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

    if(index < 0) index += array.length;
    
    return [ array.slice(0, index), array.slice(index) ];
}

module.exports = curry(1, sever);
