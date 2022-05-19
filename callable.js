/**
 * @module callable
 */

'use strict';

const always = require('./always');

/**
 * If *value* is a function, return it. Otherwise, return a function that always returns *value* regardless of its
 * arguments.
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

module.exports = callable;

function callable(value) {
    return (typeof value === 'function') ? value : always(value);
}