/**
 * @module flatten 
 */
'use strict';

const isflattenable = value => (typeof value?.flat === 'function');

/**
 * Function variant of {@link external:Array.prototype.flat Array.prototype.flat()}. Flatten *list* by the specified
 * number of dimensions.
 * 
 * If *list* does not have a `flat()`-method, *list* itself is returned, regardless of *depth*.
 * 
 * `flatten()` is curried by default.
 * 
 * @func flatten
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} depth The number of dimensions to flatten *list*
 * @param {(any[]|any)} list The list to flatten
 * @returns {any[]}
 */
module.exports = require('./curry2')(

    function flatten(depth, list) {
        return isflattenable(list) ? list.flat(depth) : list;
    }
)