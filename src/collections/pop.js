/**
 * @module collections/pop
 */

'use strict';

/**
 * Remove and return the last item in *array* or return `undefined` if *array* is empty.
 * 
 * @func pop
 * @param {any[]} array The array to return the last item from
 * @returns {any}
 */
module.exports = function pop(array) {
    return array.pop();
}