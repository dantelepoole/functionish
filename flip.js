/**
 * @module flip
 */

'use strict';

module.exports = flip;

/**
 * Return a function that calls the *func* function with the order of the first two parameters reversed.
 * 
 * If the returned function receives more than two arguments, the additional arguments are passed to *func* in their
 * original order.
 * 
 * Be aware that that the returned function is *not* curried by default. If *func* is curried and you want to maintain
 * the currying after flipping the parameters, you need to curry the returned function yourself.
 * 
 * @example
 *     
 * const flip = require('functionish/flip');
 * 
 * const isgreaterthan = (x,y) => (x > y);
 * const islessthanorequal = flip( isgreaterthan );
 * 
 * isgreaterthan(1,42); // returns `false`
 * islessthanorequal(1,42); // returns `true`
 * 
 * @func flip
 * @param {function} func The function to flip the parameters for
 * @returns {function}
 */
function flip(func) {

    function flippedfunction(a, b, ...args) {
        return (arguments.length === 0) ? func() : func(b,a, ...args);
    }

    return flippedfunction;
}