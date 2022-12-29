/**
 * @module misc/notequal
 */

'use strict';

/**
 * Return `true` if *a* and *b* are not strictly equal, otherwise return false.
 * 
 * `notequal()` compares its arguments using the strictly equality operator `===`. This means that comparing `NaN` to
 * any value will always return `true`.
 * 
 * @func notequal
 * @param {any} a The value to compare with
 * @param {any} b The value to compare to
 * @returns {boolean}
 */
module.exports = function notequal(a,b) {
    return (a !== b);
}