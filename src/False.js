/**
 * @module False
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * Always return the boolean `false`. If *expression* is a function, it is called with *args* and its return value is
 * ignored.
 * 
 * @example <caption>Example usage of `False()`</caption>
 * 
 * const { False } = require('functionish');
 * 
 * False(); // returns false
 * False(console.log, 'fubar'); // prints `fubar` to stdout and returns false
 * 
 * @function False
 * @param {any} expression A function to call or any other value
 * @param {...any[]} args The arguments to pass to *expression* if it is a function
 * @returns {boolean} Always boolean `false`
 */
function False(expression, ...args) {

    isfunction(expression) && expression(...args);

    return false;
}

module.exports = False;