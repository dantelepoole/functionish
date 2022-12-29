/**
 * @module collections/push
 */

'use strict';

/**
 * Pass *items* to *array*'s `push()` method and return the array.
 * 
 * @func push
 * @param {any[]} array The array to push the *items* to
 * @param {...any[]} items The items to push to the array
 * @returns {any[]} The *array*
 */
module.exports = function push(array, ...items) {
    
    array.push(...items);

    return array;
}