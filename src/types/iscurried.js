/**
 * @module types/iscurried
 */

'use strict';

const CurryArity = require('../curry').CurryArity;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `iscurried()`</caption>
 * 
 * [to do]
 * 
 * @function iscurried
 * @param {function} func The function to check
 * @returns {boolean}
 */
function iscurried(func) {
    return (func?.[CurryArity] > 0);
}

module.exports = iscurried;