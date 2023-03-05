/**
 * @module collections/push
 */

'use strict';

/**
 * Pass *items* to *array*'s `push()` method and return the array.
 * 
 * @function push
 * @param {any[]} array The array to push the *items* to
 * @param {...any[]} items The items to push to the array
 * @returns {any[]} The *array*
 */
function push(array, ...items) {
    
    array.push(...items);

    return array;
}

module.exports = push;