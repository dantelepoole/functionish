'use strict';

/**
 * Return `true` if *value* has type `symbol`.
 * 
 * @module lib/issymbol
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function issymbol(value) {
    return (typeof value === 'symbol');
}