/** 
 * Return a function that always returns *value*, regardless of its arguments.
 * 
 * If the FUNCTIONISH_NAMED_FUNCTIONS environment variable has been set, the returned function will have "always" prepended
 * to its name, to aid in debugging.
 * 
 * @module always
 * @param {any} value The value to always return
 * @returns {function}
 * @example
 * 
 * const always = require('functionish/always');
 * 
 * const always42 = always(42);
 * console.log( always42() ); // prints '42'
 * 
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

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