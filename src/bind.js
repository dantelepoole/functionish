/**
 * @module bind
 */

'use strict';

const curry = require('./curry');
const isfunction = require('./types/isfunction');

const resolve = (target, context) => isfunction(target) ? target : context[target];

/**
 * Functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}. Return a function that runs
 * *target* with *context* for its `this`-value and pre-bound to the *arg* arguments.
 * 
 * If *target* is a string or symbol instead of a function, the target function is looked up as a method on the
 * *context* object with the key *target*.
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
 * @param {(function|string|symbol)} target The function or method key to bind to *context* and *args*
 * @param {object} context The value to assign to *func*'s `this` value
 * @param {...any} args The optional args to bind to *func*
 * @returns {function}
 */
function bind(target, context, ...args) {
    return resolve(target, context).bind(context, ...args);
}

module.exports = curry(1, bind);