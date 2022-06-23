/**
 * @module indexof
 */

'use strict';

const INDEX_NOT_FOUND = -1;

/**
 * Function variant of {@link external:Array.prototype.indexOf Array.prototype.indexOf()}. Return the index *value*
 * in *list* or -1 if values is not found.
 * 
 * The *list* argument may be either an array or an iterable object. If it is neither, -1 is returned.
 * 
 * `indexof()` is curried by default.
 * 
 * @func indexof
 * @param {any} value The value of which to find the index
 * @param {any[]} list The list to search
 * @returns {number}
 */
module.exports = require('./curry2')(

    function indexof(value, list) {
        return (typeof list?.indexOf === 'function') ? list.indexOf(value) : indexofiterable(value, list);
    }
)

function indexofiterable(value, iterable) {

    let index = INDEX_NOT_FOUND;

    for(const item of iterable) {
        index += 1;
        if( value === item ) break;
    }

    return index;
}
