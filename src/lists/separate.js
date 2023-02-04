/**
 * @module lists/separate
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Separate the items in *list* depending on whether or not *predicate* accepts or rejects an
 * item. The return value is a two-item array with the first array containing an array of items for which *predicate*
 * returned `true` and the second containing an array of items for which *predicate* returned `false`.
 * 
 * `separate()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `seperate()`</caption>
 * 
 * const { separate } = require('functionish/lists');
 * 
 * const iseven = x => ((x%2) === 0);
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * 
 * separate(iseven, list); // returns [ [2,4,6,8,10], [1,3,5,7,9] ]
 * 
 * @function separate
 * @param {function} predicate The predicate function to apply to each item in *list*
 * @param {iterable} list An iterable object that produces the items to separate
 * @returns {any[][]}
 */
function separate(predicate, list) {

    const buffertrue = [];
    const bufferfalse = [];

    for(const item of list) predicate(item) ? buffertrue.push(item) : bufferfalse.push(item);

    return [buffertrue, bufferfalse];
}

module.exports = curry2(separate);