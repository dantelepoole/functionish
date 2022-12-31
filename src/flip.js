/**
 * @module flip
 */

'use strict';

const isfunction = require('../types/isfunction');
const loadfunction = require('./loadfunction');

/**
 * Return a function that calls the *func* function with the order of the first two parameters reversed.
 * 
 * If the returned function receives more than two arguments, the additional arguments are passed to *func* in their
 * original order.
 * 
 * Be aware: if *func* is curried, the currie not work for the first two arguments, since `flip()` always
 * invokes *func* with at least two arguments, even if less were actually passed.
 * 
 * *func* may either be a function or the path to a package or module that exports a function.
 * 
 * @example
 * const flip = require('functionish/flip');
 * 
 * const isgreaterthan = (x,y) => (x > y);
 * const islessthanorequal = flip(isgreaterthan);
 * 
 * isgreaterthan(1,42); // returns false
 * islessthanorequal(1,42); // returns true
 * 
 * @function flip
 * @param {(function|string)} func The function to flip the arguments for
 * @returns {function}
 */
module.exports = function flip(func) {

    isfunction(func) || (func = loadfunction(func));

    return (a, b, ...args) => func(b, a, ...args);
}