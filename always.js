/**
 * @module always
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

/** 
 * Return a function that always returns *value*, regardless of its arguments.
 * 
 * If the FUNCTIONISH_NAMED_FUNCTIONS environment variable has been set, the returned function will have "always" prepended
 * to its name, to aid in debugging.
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
module.exports = NAMED_FUNCTIONS ? always_named : always;

function always(value) {
    return () => value;
}

function always_named(value) {

    const alwaysname = `always[${typeof value}]`;

    const container = {
        [alwaysname] : () => value
    }

    return container[alwaysname];
}