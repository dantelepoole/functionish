/**
 * @module collections/stem
 */

'use strict';

/**
 * [to do]
 * 
 * @example
 * 
 * [to do]
 * 
 * @function stem
 * @param {any[]} array The array to remove the last item from
 * @returns {any[]}
 */
function stem(array) {
    return array.slice(0, array.length - 1);
}

module.exports = stem;
