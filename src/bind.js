/**
 * @module bind
 */

'use strict';

const curry1 = require('./curry1');
const isfunction = require('./types/isfunction');

/**
 * Functional variant of {@link external:Function.prototype.bind Function.prototype.bind()}.
 * 
 * If *target* is a function, it is bound to *thisvalue* and the *boundargs*. Otherwise, *target* is
 * presumed to the key to a method of *thisvalue*, which method is then bound to *thisvalue* and the
 * *boundargs*.
 * 
 * `bind()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `bind()`</caption>
 * 
 * const { bind } = require('functionish');
 * 
 * const log = bind(console.log, console); // OR: const log = bind('log', console);
 * 
 * log('foo', 'bar'); // prints `foo bar`
 * 
 * @function bind
 * @see {@link external:Function.prototype.bind Function.prototype.bind()}
 * @param {(function|string|symbol)} target The function or method key to bind
 * @param {any} thisvalue The value to use for the bound function's `this` value
 * @param {...any} args The optional arguments to bind *target* with
 * @returns {function}
 */
const bind = curry1(function bind(target, thisvalue, ...boundargs) {

    return isfunction(target) && target.bind(thisvalue, ...boundargs)
                              || thisvalue[target].bind(thisvalue, ...boundargs);

})

module.exports = bind;