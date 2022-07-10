/**
 * @module notsymbol
 */

'use strict';

/**
 * Return `true` if *value* does not have type `symbol`.
 * 
 * @func notsymbol
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notsymbol(value) {
    return (typeof value !== 'symbol');
}