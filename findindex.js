'use strict';

const INDEX_NOT_FOUND = -1;

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');

/**
 * Similar to {@link module:find find()}, except it returns the index of the found item instead of the found item
 * itself. Also, whereas `find()` will attempt to match *list* directly if *list* is not iterable, `findindex()` will
 * always return `-1` if *list* is not an array or an iterable object. This is because it makes no sense to return an
 * index if *list* cannot be indexed.
 * 
 * `findindex()` is curried by default.
 * 
 * @module findindex
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {(array|iterable|any)} list The list of values to search for
 * @returns {number} The index of the found item or `-1` if the item was not found
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
 */
module.exports = require('./curry2')(

    function findindex(predicate, list) {

        return isarray(list) ? list.findIndex(predicate)
            : isiterable(list) ? iterablefindindex(predicate, list)
            : INDEX_NOT_FOUND;
    }
)

function iterablefindindex(predicate, iterable) {

    let index = 0;

    for( const item of iterable ) {
       
        if( predicate(item) ) return index;

        index += 1;
    }

    return INDEX_NOT_FOUND;
}