/**
 * @module arrays/count
 */

'use strict';

/**
 * Count the number of items in the argument *countable*. This function returns the value of *countable*'s
 * `length` property or, if the `length` property is undefined, the value of the *countable*'s `size`
 * property. If the `size` property is also `undefined`, the return value is `NaN`.
 * 
 * @example <caption>Example usage of `count()`</caption>
 * 
 * const {count} = require('functionish/arrays');
 * 
 * count( [1,2,3,4,5] ); // returns 5
 * count( 'foobar' ); // returns 6
 * count( new Set([1,1,1,2]) ); // returns 2
 * 
 * @function count
 * @param {countable} countable An object with a `length` or `size` property
 * @returns {number}
 */
function count(countable) {
    return (countable.length ?? countable.size ?? NaN);
}

module.exports = count;