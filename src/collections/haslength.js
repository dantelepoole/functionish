/**
 * @module collections/haslength
 */

'use strict';

/**
 * Return `true` if *source* has a `length` property with the value *length*. Otherwise, return `false`.
 * 
 * @func haslength
 * @param {number} length The length to check from
 * @param {object} source The object whose length to check
 * @returns {boolean}
 */
module.exports = function haslength(length, source) {
    return (source.length === length);
}