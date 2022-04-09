'use strict';

const INDEX_NOT_FOUND = -1;

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');
const isequal = require('./isequal');

/**
 * Function variant of {@link external:Array.prototype.indexOf Array.prototype.indexOf()}. Return the index *value*
 * in *list* or -1 if values is not found.
 * 
 * The *list* argument may be either an array or an iterable object. If it is neither, -1 is returned.
 * 
 * `indexof()` is curried by default.
 * 
 * @module indexof
 * @param {any} value The value of which to find the index
 * @param {(array|iterable)} list The list to search
 * @returns {number}
 */
module.exports = require('./curry2')(

    function indexof(value, list) {

        return isarray(list) ? list.indexOf(value)
            : isiterable(list) ? iterableindexof(value, list)
            : INDEX_NOT_FOUND;
    }
)

function iterableindexof(value, iterable) {

    let index = 0;

    const equalsvalue = isequal(value);

    for( const item of iterable ) {
        if( equalsvalue(item) ) return index;
        index += 1;
    }

    return INDEX_NOT_FOUND;
}