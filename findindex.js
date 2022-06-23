/**
 * @module findindex
 */

'use strict';

const INDEX_NOT_FOUND = -1;

const isarray = require('./isarray');
const unary = require('./unary');

/**
 * Similar to {@link module:find find()}, except it invokes the `findIndex()`-method of *list* and returns the
 * index of the found item instead of the found item itself. If *list* is not array it is assumed to be an iterable
 * object and it is iterated over instead.
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
 * @param {(any[]|iterable)} list An array or iterable object producing the items to search
 * @returns {number} The index of the found item or `-1` if the item was not found
 */
module.exports = require('./curry2')(

    function findindex(predicate, list) {
        return isarray(list) ? list.findIndex( unary(predicate) ) : findIndexiterable(predicate, list);
    }
)

function findIndexiterable(predicate, iterable) {

    let index = INDEX_NOT_FOUND;

    for(const item of iterable) { 
        index += 1;
        if( predicate(item) ) return index;
    }

    return index;
}