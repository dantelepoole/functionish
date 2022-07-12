/**
 * @module length
 */

'use strict';

/**
 * Return the value of *source*'s `length` property or `undefined` if it does not have a `length` property.
 * 
 * @func length
 * @param {object} source The object to retrieve the `length` property from
 * @returns {number}
 */
module.exports = function length(source) {
    return source?.length;
}