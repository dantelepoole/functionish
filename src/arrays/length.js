/**
 * @module arrays/length
 */

'use strict';

/**
 * Return the value of *collection*'s `length` or `size` property or `NaN` if it has neither.
 * 
 * @function length
 * @param {object} collection The object to retrieve the `length` or `size` property from
 * @returns {number}
 */
function length(collection) {
    return (collection.length ?? collection.size ?? NaN);
}

module.exports = length;