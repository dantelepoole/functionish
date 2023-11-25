/**
 * @module True
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * Always return the boolean `true`. If *expression* is a function, it is called with *args* and its return value is
 * ignored.
 * 
 * @example <caption>Example usage of `True()`</caption>
 * 
 * const { True } = require('functionish');
 * 
 * True(); // returns true
 * True(console.log, 'fubar'); // prints `fubar` to stdout and returns true
 * 
 * @function True
 * @param {any} expression A function to call or any other value
 * @param {...any[]} args The arguments to pass to *expression* if it is a function
 * @returns {boolean} Always boolean `true`
 */
function True(expression, ...args) {

    isfunction(expression) && expression(...args);

    return true;
}

module.exports = True;