/**
 * @module issymbol
 * @ignore
 */

'use strict';

/**
 * Return `true` if *value* has type `symbol`.
 * 
 * @func issymbol
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function issymbol(value) {
    return (typeof value === 'symbol');
}