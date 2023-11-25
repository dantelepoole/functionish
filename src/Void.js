/**
 * @module Void
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * Always return `undefined`. If *expression* is a function, it is called with *args* and its return value is
 * ignored.
 * 
 * @example <caption>Example usage of `Void()`</caption>
 * 
 * const { Void } = require('functionish');
 * 
 * Void(); // returns undefined
 * Void(console.log, 'fubar'); // prints `fubar` to stdout and returns undefined
 * 
 * @function Void
 * @param {any} expression A function to call or any other value
 * @param {...any[]} args The arguments to pass to *expression* if it is a function
 * @returns {undefined}
 */
function Void(expression, ...args) {
    isfunction(expression) && expression(...args);
}

module.exports = Void;