/**
 * @module bind
 */

'use strict';

/**
 * A functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}. Return a bound version
 * of *func* that will run with *context* as its `this` and will be passed *args* automatically when called.
 * 
 * See {@link module:partial partial()} for a function that does the same thing but without provinding for a *context*.
 * 
 * @func bind
 * @see {@link module:partial partial()}
 * @see {@link external:Function.prototype.bind Function.prototype.bind()}
 * @param {function} func The function to bind to *context* and *args*
 * @param {object} context The value to assign to *func*'s `this`
 * @param {...any} args The optional args to prebind to *func*
 * @returns {function}
 */

module.exports = function bind(func, context, ...args) {
    return func.bind(context, ...args);
}