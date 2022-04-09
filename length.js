'use strict';

/**
 * Return the value of *source*'s `length` property or `undefined` if it does not have a `length` property.
 * 
 * @module length
 * @param {object} source The object to retrieve the `length` property for
 * @returns {number}
 */
module.exports = function length(source) {
    return source?.length;
}