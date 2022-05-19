/**
 * @module always
 */

'use strict';

/** 
 * Return a function that always returns *value*, regardless of its arguments.
 * 
 * @example
 * 
 * const always = require('functionish/always');
 * 
 * const always42 = always(42);
 * always42(); // returns '42'
 * 
 * @func always
 * @param {any} value The value to always return
 * @returns {function}
 */
module.exports = always;

function always(value) {
    return () => value;
}