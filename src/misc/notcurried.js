/**
 * @module misc/notcurried
 */

'use strict';

const CurryArity = require('../curry').CurryArity;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `notcurried()`</caption>
 * 
 * [to do]
 * 
 * @function notcurried
 * @param {function} func The function to check
 * @returns {boolean}
 */
function notcurried(func) {
    return !(func?.[CurryArity]);
}

module.exports = notcurried;