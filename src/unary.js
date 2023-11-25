/**
 * @module unary
 */

'use strict';

/**
 * Return a function that accepts exactly one argument and passes it to *targetfunc*. Any other arguments
 * passed to the returned function are ignored. When called without any arguments, the argument passed to *targetfunc*
 * will be `undefined`.
 * 
 * @example <caption>Example usage of `unary()`</caption>
 * 
 * const { unary } = require('functionish');
 * 
 * const unarylog = unary(console.log);
 * 
 * unarylog('foobar', 'foobar2'); // prints only 'foobar' to the screen
 * 
 * @function unary
 * @see {@link module:witharity witharity()}
 * @see {@link module:nullary nullary()}
 * @see {@link module:binary binary()}
 * @param {function} targetfunc The function to call with exactly one argument
 * @returns {function}
 */
function unary(targetfunc) {
    return x => targetfunc(x);
}

module.exports = unary;