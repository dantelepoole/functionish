'use strict';

/**
 * Return `true` if *value* has type `string`.
 * 
 * @module lib/isstring
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isstring(value) {
    return (typeof value === 'string');
}