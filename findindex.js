/**
 * @module findindex
 */

'use strict';

const unary = require('./unary');

/**
 * Similar to {@link module:find find()}, except it invokes the `findIndex()`-method of *list* and returns the
 * index of the found item instead of the found item itself.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *list*'s
 * `findIndex()` method (if it exists). This means that *predicate* will only ever receive a single argument (the item
 * being searched) regardless of how many arguments *list*'s `findIndex()` method actually passes.
 * 
 * `findindex()` is curried by default.
 * 
 * @example
 *     
 * const findindex = require('functionish/findindex');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * findindex(iseven, [1,2,3,4]); // returns 1
 * findindex(iseven, [1,3,5]); // returns -1
 * findindex(iseven, 2); // returns -1
 * 
 * @func findindex
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {any[]} list An array of items to search
 * @returns {number} The index of the found item or `-1` if the item was not found
 */
module.exports = require('./curry2')(

    function findindex(predicate, list) {
        return list.findIndex( unary(predicate) );
    }
)