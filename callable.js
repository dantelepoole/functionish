/**
 * @module callable
 */

'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

/**
 * If *value* is a function, return it. Otherwise, return a function that always returns *value* regardless of its
 * arguments.
 * 
 * If the FUNCTIONISH_NAMED_FUNCTIONS environment variable has been set, the returned function will have "callable"
 * prepended to its name, to aid in debugging.
 * 
 * @example
 * 
 * const callable = require('functionish/callable');
 * 
 * const fortytwo = callable(42);
 * fortytwo(); // returns '42'
 * 
 * const random = callable(Math.random);
 * random(); // returns a random number between 0 and 1
 * 
 * @func callable
 * @see {@link module:evaluate evaluate()}
 * @param {any} value The value to make callable
 * @returns {function}
 */

module.exports = NAMED_FUNCTIONS ? callable_named : callable;

function callable(value) {
    return (typeof value === 'function') ? value : () => value;
}

function callable_named(value) {

    if( typeof value === 'function' ) return value;

    const callablename = `callable[${typeof value}]`;

    const container = {
        [callablename] : () => value
    }

    return container[callablename];
}