/**
 * @module curryarity
 */

'use strict';

const CurryArity = require('../curry').CurryArity;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `curryarity()`</caption>
 * 
 * [to do]
 * 
 * @function curryarity
 * @param {function} func The function to check
 * @returns {number}
 */
function curryarity(func) {
    return +(func?.[CurryArity]);
}

module.exports = curryarity;