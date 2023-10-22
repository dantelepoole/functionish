/**
 * @module misc/iscurried
 */

'use strict';

const SYMBOL_CURRYARITY = Symbol.for('functionish/curry/#CurryArity');

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
    return !!(func?.[SYMBOL_CURRYARITY]);
}

module.exports = iscurried;