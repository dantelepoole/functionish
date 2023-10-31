/**
 * @module misc/curryarity
 */

'use strict';

const SYMBOL_CURRYARITY = Symbol.for('functionish/curry/#CurryArity');

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
    return func[SYMBOL_CURRYARITY];
}

module.exports = curryarity;