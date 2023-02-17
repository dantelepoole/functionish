/**
 * @module tap
 */

'use strict';

const curryfunction = require('../lib/curryfunction');

/**
 * Return a function that passes its arguments to *tappedfunc* and returns its own first
 * argument.
 * 
 * Currying is preserved. If *tappedfunc* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * returned function will be curried with the same arity.
 * 
 * @example <caption>Example usage of `tap()`</caption>
 * 
 * const { tap } = require('functionish');
 * 
 * const log = tap(console.log);
 * 
 * log(42); // prints 42 to the screen and returns 42
 * 
 * @param {function} tappedfunc The function to tap
 * @returns {function}
 */
function tap(tappedfunc) {

    const _tap = (...args) => (tappedfunc(...args), args[0]);

    return tappedfunc.arity
         ? curryfunction(tappedfunc.arity, _tap)
         : _tap;
}

module.exports = tap;