/**
* @module types/notundefined
*/

'use strict';

/**
 * Return `true` if and only if *value* is not `undefined`, otherwise return `false`.
 * 
 * @func notundefined
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notundefined(value) {
    return (value !== undefined);
}