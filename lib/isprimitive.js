'use strict';

const PRIMITIVE_TYPES = {
    bigint    : true,
    boolean   : true,
    number    : true,
    string    : true,
    symbol    : true,
    undefined : true
}

/**
 * Return `true` if *value* is `null` or has one of the Javascript primitive types: bigint, boolean, number,
 * string, symbol or undefined
 * 
 * @module lib/isprimitive
 * @ignore
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function isprimitive(value) {
    return PRIMITIVE_TYPES[typeof value] || (value === null);
}