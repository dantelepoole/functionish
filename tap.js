/**
 * @module tap
 */

'use strict';

const id = require('./id');
const resolvefunction = require('./resolvefunction');

/**
 * Return a function that passes its arguments to *tapfunc* and returns its own first argument, discarding
 * *tapfunc*'s return value.
 * 
 * If the optional *nextfunc* is passed, the returned function will pass its arguments to *nextfunc* as
 * well, but will return *nextfunc*'s return value (instead of its own first argument).
 * 
 * @example
 * const tap = require('functionish/tap');
 * 
 * const log = console.log.bind(console);
 * const sum = (a,b) => (a+b);
 * const loggingsum = tap(log, sum);
 * 
 * loggingsum(42, 3); // prints "42, 3" to the console and returns 45s;
 * 
 * @func tap
 * @param {function} tapfunc The function to call
 * @param {function} nextfunc The second function to call
 * @returns {any}
 */
 module.exports = function tap(tapfunc, nextfunc=id) {

    tapfunc = resolvefunction(tapfunc);
    nextfunc = resolvefunction(nextfunc);

    return (...args) => (tapfunc(...args), nextfunc(...args));
}
