/**
 * @module bind
 */

'use strict';

const TYPE_FUNCTION = 'function';

/**
 * A functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}. Return a bound version
 * of *func* that will run with *context* as its `this` and will be passed *args* automatically when called.
 * 
 * If *func* is not a function, it is to be the key of the *context* method to bind.
 * 
 * See {@link module:partial partial()} for a function that does the same thing but without providing for a *context*.
 * 
 * `bind()` does not preserve currying, so the returned function is never curried, even if *func* has
 * been curried.
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

    return (typeof func === TYPE_FUNCTION)
         ? func.bind(context, ...args)
         : context[func].bind(context, ...args);
}

module.exports = bind;