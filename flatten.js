'use strict';

const isiterable = require('./isiterable');

const isflattenable = value => (typeof value?.flat === 'function');

/**
 * Function variant of {@link external:Array.prototype.flat Array.prototype.flat()}. Flatten *list* by the specified
 * number of dimensions.
 * 
 * If *list* is neither an array, an iterable object nor an object with a `flat()` method, an empty array is
 * returned.
 * 
 * `flatten()` is curried by default.
 * 
 * @module flatten
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} depth The number of dimensions to flatten *list*
 * @param {(array|iterable)} list The list to flatten
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function flatten(depth, list) {

        return isflattenable(list) ? list.flat(depth)
            : isiterable(list) ? [...list].flat(depth)
            : [];
    }
)