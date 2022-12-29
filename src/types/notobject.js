/**
 * @module types/notobject
 */

'use strict';

/**
 * Return `true` if *value* does not have type `object` *OR* if it is `null`.
 * 
 * @func notobject
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notobject(value) {
    return (typeof value !== 'object' || value === null);
}