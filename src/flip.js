/**
 * @module flip
 */

'use strict';

const curry = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * const flip = require('functionish/flip');
 * 
 * const isgreaterthan = (x,y) => (x > y);
 * const islessthanorequal = flip(isgreaterthan);
 * 
 * isgreaterthan(1,42);     // returns false
 * islessthanorequal(1,42); // returns true
 * 
 * @function flip
 * @param {function} func The function to flip the arguments for
 * @param {...any[]} partialargs Optional arguments to pass to *func*
 * @returns {function}
 */
function flip(func, ...partialargs) {

    const curryarity = func.curryarity - partialargs.length;

    return (curryarity > 0)
         ? curry(curryarity, _flipped)
         : _flipped;

    function _flipped(a, b, ...args) {
        return func.call(this, ...partialargs, b, a, ...args);
    }
}

module.exports = flip;