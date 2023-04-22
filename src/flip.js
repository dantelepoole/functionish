/**
 * @module flip
 */

'use strict';

/**
 * Return a function that calls the *func* function with the order of the first two arguments reversed. Any further
 * arguments are passed in their original order.
 * 
 * [to do: partialargs]
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * const flip = require('functionish/flip');
 * 
 * const isgreaterthan = (x,y) => (x > y);
 * const islessthanorequal = flip(isgreaterthan);
 * 
 * isgreaterthan(1,42);     s// returns false
 * islessthanorequal(1,42); // returns true
 * 
 * @function flip
 * @param {function} func The function to flip the arguments for
 * @param {...any[]} partialargs Optional arguments to pass to *func*
 * @returns {function}
 */
function flip(func, ...partialargs) {

    return function _flipped(a, b, ...args) {
        return func.call(this, ...partialargs, b, a, ...args);
    }
}

module.exports = flip;