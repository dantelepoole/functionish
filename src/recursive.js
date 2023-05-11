/**
 * @module recursive
 */

'use strict';

const partial = require('./partial');
const recurse = require('./recurse');

/**
 * to do
 * 
 * @example <caption>Example usage of `recursive()`</caption>
 * 
 * to do
 * 
 * @function recursive
 * @param {function} func The recursive function
 * @param {...any[]} partialargs Optional arguments to partially apply to *func*
 * @returns {function}
 */
function recursive(func, ...partialargs) {
    return partial(recurse, func, ...partialargs);
}

module.exports = recursive;