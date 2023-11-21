/**
 * @module flip
 */

'use strict';

/**
 * Return a function that calls *targetfunc* with its first two arguments swapped. Any further
 * arguments passed to the flipped function are forwarded unchanged.
 * 
 * The flipped function is curried with unary arity, meaning that it requires at least two arguments
 * to run. If you need the flipped function to run regardless of the number of arguments, pass the flipped
 * function to @see {@link module:binary binary()}.
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * const { flip } = require('functionish');
 * 
 * const sort = (a,b) => (a <= b) ? [a,b] : [b,a];
 * const reversesort = flip(sort);
 * 
 * sort(41, 42); // returns [41, 42]
 * sortreverse(41, 42); // returns [42, 41]
 * 
 * const sortreverse41 = sortreverse(41); // returns a curried function
 * sortreverse41(42); // returns [42, 41]
 * sortreverse41(40); // returns [41, 40]
 * 
 * @function flip
 * @param {function} targetfunc The function to flip the arguments for
 * @returns {function}
 */
function flip(targetfunc) {

    return function _flip(a, b, ...args) {

        return (arguments.length === 1)
             ? (b, ...args) => targetfunc(b, a, ...args)
             : targetfunc(b, a, ...args);
    }

}

module.exports = flip;