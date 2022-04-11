/**
 * @module flatmap
 */

'use strict';

const flip = require('./flip');
const isiterable = require('./isiterable');

const isflatmappable = value => (typeof value?.flatMap === 'function');
const mapiterable = flip(Array.from);

/**
 * Function variant of {@link external:Array.prototype.flatMap Array.prototype.flatMap()}. Map *func* to each item in
 * *list* and flatten the result.
 * 
 * If *list* is neither an array, an iterable object nor an object with a `flatMap()` method, an empty array is
 * returned.
 * 
 * `flatmap()` is curried by default.
 * 
 * @func flatmap
 * @see {@link external:Array.prototype.flatMap Array.prototype.flatMap()}
 * @param {function} func The function to map to *list*
 * @param {(array|iterable)} list The array or iterable object to flatmap
 * @returns {any[]}
 */
module.exports = require('./curry2')(
    
    function flatmap(func, list) {

        return isflatmappable(list) ? list.flatMap(func)
            : isiterable(list) ? mapiterable(func, list).flat()
            : [];
    }
)