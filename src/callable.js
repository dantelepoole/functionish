/**
 * @module callable
 */

'use strict';

const always = require('./always');
const isfunction = require('./types/isfunction');

/**
 * If *value* is a function, return it. Otherwise, return a function that always returns *value* regardless of its
 * arguments.
 * 
 * @example <caption>Example usage of `callable()`</caption>
 * 
 * const { callable } = require('functionish');
 * 
 * const fortytwo = callable(42);
 * fortytwo(); // returns 42
 * 
 * const random = callable(Math.random);
 * random(); // call Math.random()
 * 
 * @function callable
 * @see {@link module:evaluate evaluate()}
 * @param {any} source The value to make callable
 * @returns {function}
 */
function callable(source) {
    
    return isfunction(source)
         ? source
         : always(source);
}

module.exports = callable;