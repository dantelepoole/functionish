/**
 * @module arrays/length
 */

'use strict';

/**
 * Return the value of *countable*'s `length` or `size` property or `NaN` if it has neither.
 * 
 * @function length
 * @param {object} countable The object to retrieve the `length` or `size` property from
 * @returns {number}
 */
function length(countable) {
    return (countable.length ?? countable.size ?? NaN);
}

module.exports = length;