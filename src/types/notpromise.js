/**
 * @module types/notpromise
 */

'use strict';

const ispromise = require('./ispromise');

/**
 * Return `true` if *value* is not a native Javascript Promise. Otherwise, return `false`.
 * 
 * @func notpromise
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function notpromise(value) {
    return ! ispromise(value);
}