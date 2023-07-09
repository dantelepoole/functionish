/**
 * @module bind
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');

/**
 * Functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}. Return a function that runs
 * *func* with *context* for its `this`-value and pre-bound to the *arg* arguments.
 * 
 * If it is a string or symbol instead of a function, the target function is looked up as a method on the *context* object
 * with the key *func*.
 * 
 * @example <caption>Example usage of `bind()`</caption>
 * 
 * const { bind } = require('functionish');
 * 
 * const log = bind(console.log, console);
 * // OR const log = bind('log', console);
 * 
 * log('foobar'); // send 'foobar' to the console.log() method
 * 
 * @function bind
 * @see {@link module:partial partial()}
 * @see {@link external:Function.prototype.bind Function.prototype.bind()}
 * @param {(function|string|symbol)} func The function to bind to *context* and *args*
 * @param {object} context The value to assign to *func*'s `this` value
 * @param {...any} args The optional args to bind to *func*
 * @returns {function}
 */
function bind(func, context, ...args) {

    return isfunction(func)
         ? func.bind(context, ...args)
         : context[func].bind(context, ...args);
}

module.exports = curry(1, bind);