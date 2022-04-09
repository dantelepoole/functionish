'use strict';

const ITEM_NOT_FOUND = undefined;

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');

/**
 * Function variant of {@link external:Array.prototype.find Array.prototype.find()}. Apply the *predicate* function to
 * each item in *list* and return the first item for which *predicate* returns a truthy value. If no item matches
 * *predicate*, return `undefined`.
 * 
 * If *list* is neither an array nor an iterable object, *predicate* is applied *list* directly.
 * 
 * `find()` is curried by default.
 * 
 * @module find
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {(array|iterable|any)} list The list of values to search for
 * @returns {(any|undefined)}
 * @example
 *     const find = require('functionish/find');
 * 
 *     const iseven = x => (x%2) === 0;
 * 
 *     find(iseven, [1,2,3,4]); // returns 2
 *     find(iseven, [1,3,5]); // returns `undefined`
 *     find(iseven, 2); // returns 2
 *     find(iseven, 1); // returns `undefined`
 */
module.exports = require('./curry2')(

    function find(predicate, list) {

        return isarray(list) ? list.find(predicate)
            : isiterable(list) ? iterablefind(predicate, list)
            : !! predicate(list) ? list : ITEM_NOT_FOUND;
    }
)

function iterablefind(predicate, iterable) {

    for( const item of iterable ) if( !! predicate(item) ) return item;

    return ITEM_NOT_FOUND;
}