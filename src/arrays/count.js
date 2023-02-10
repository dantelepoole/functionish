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
 * @param {iterable} list An iterable object
 * @returns {number}
 */
function count(list) {
    return (list.length ?? list.size ?? countiterable(list));
}

function countiterable(list) {

    let count = 0;

    for(const value of list) count += 1;

    return count;
}

module.exports = count;