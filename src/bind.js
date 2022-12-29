/**
 * @module bind
 */

'use strict';

const isfunction = require('./isfunction');

/**
 * A functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}. Return a bound version
 * of *func* that will run with *context* as its `this` and will be passed *args* automatically when called.
 * 
 * If *func* is not a function, it is to be the key of the *context* method to bind.
 * 
 * See {@link module:partial partial()} for a function that does the same thing but without providing for a *context*.
 * 
 * @example
 * 
 * const bind = require('functionish/bind');
 * 
 * const log = bind(console.log, console);
 * // OR const log = bind('log', console);
 * 
 * @func bind
 * @see {@link module:partial partial()}
 * @see {@link external:Function.prototype.bind Function.prototype.bind()}
 * @param {(function|string)} func The function to bind to *context* and *args*
 * @param {object} context The value to assign to *func*'s `this`
 * @param {...any} args The optional args to bind to *func*
 * @returns {function}
 */

module.exports = function bind(func, context, ...args) {

    return isfunction(func) ? func.bind(context, ...args)
                            : context[func].bind(context, ...args);
}