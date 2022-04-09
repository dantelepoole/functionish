'use strict';

/**
 * Return `true` if *value* has type `object` *and* it is not `null`.
 * 
 * @module lib/isobject
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isobject(value) {
    return (typeof value === 'object' && value !== null);
}