/**
 * @module flatten 
 */
'use strict';

/**
 * Function variant of {@link external:Array.prototype.flat Array.prototype.flat()}. Pass *depth* to *flattenable*'s
 * `flatten()`-method and return the result.
 * 
 * `flatten()` is curried by default.
 * 
 * @func flatten
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} depth The number of dimensions to flatten *flattenable*
 * @param {object} flattenable An object with a `flat()` method
 * @returns {any}
 */
module.exports = require('./curry2')(

    function flatten(depth, list) {
        return list.flat(depth);
    }
)