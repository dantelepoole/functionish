/**
 * @module flatten 
 */
'use strict';

/**
 * Invoke the `flat()` method of *flattenable* with the specified depth and return the result.
 * 
 * `flat()` is curried by default.
 * 
 * @func flat
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} [depth=1] The number specificying how many levels deep to flatten the *flattenable*
 * @param {flattenable} flattenable An object with a `flat()` method
 * @returns {any}
 */
module.exports = require('./curry2')(

    function flat(depth, flattenable) {
        return flattenable.flat(depth);
    }
)