/**
 * @module types/iserror
 */

'use strict';

const iserror = require('./iserror');

/**
 * Return `true` if *value* is not a native Javascript Error-instance. If it is an Error-instance, return `false`.
 * 
 * @func noterror
 * @see {@link module:iserror iserror()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function noterror(error) {
    return ! iserror(error);
}