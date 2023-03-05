/**
 * @module collections/pop
 */

'use strict';

/**
 * Remove and return the last item in *array* or return `undefined` if *array* is empty.
 * 
 * @function pop
 * @param {any[]} array The array to return the last item from
 * @returns {any}
 */
function pop(array) {
    return array.pop();
}

module.exports = pop;