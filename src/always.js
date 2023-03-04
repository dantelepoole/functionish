/**
 * @module always
 */

'use strict';

/** 
 * Return a function that always returns *value*, regardless of its arguments.
 * 
 * @example <caption>Example usage of `always()`</caption>
 * 
 * const { always } = require('functionish');
 * 
 * const always42 = always(42);
 * 
 * always42(); // returns '42'
 * 
 * @function always
 * @param {any} value The value to always return
 * @returns {function}
 */
function always(value) {
    
    const _always = () => value;

    return _always;
}

module.exports = always;