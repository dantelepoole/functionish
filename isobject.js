/**
 * @module isobject
 * @ignore
 */
'use strict';

/**
 * Return `true` if *value* has type `object` *and* it is not `null`.
 * 
 * @func isobject
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isobject(value) {
    return (typeof value === 'object' && value !== null);
}