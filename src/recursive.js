/**
 * @module recursive
 */

'use strict';

const THIS_NULL = null;

const recurse = require('./recurse');

/**
 * to do
 * 
 * @example <caption>Example usage of `recursive()`</caption>
 * 
 * to do
 * 
 * @function recursive
 * @param {function} targetfunc The recursive function
 * @param {...any[]} partialargs Optional arguments to partially apply to *func*
 * @returns {function}
 */
function recursive(targetfunc, ...partialargs) {
    return recurse.bind(THIS_NULL, targetfunc, ...partialargs);
}

module.exports = recursive;