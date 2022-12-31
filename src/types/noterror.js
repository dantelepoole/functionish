/**
 * @module types/iserror
 */

'use strict';

const iserror = require('./iserror');

/**
 * Return `true` if the argument is not an instance of the Javascript native Error class. Otherwise,
 * return `false`.
 * 
 * @example
 * const noterror = require('functionish/types/noterror');
 * 
 * noterror(new Error()); // returns false
 * noterror(new TypeError()); // returns false
 * 
 * class MyError extends Error {}
 * noterror(new MyError()); // returns false
 * 
 * noterror(Error); // returns true
 * 
 * @func noterror
 * @see {@link module:types/iserror iserror()}
 * @param {any} value The value to check
 * @returns {boolean}
 */
module.exports = function noterror(error) {
    return ! iserror(error);
}