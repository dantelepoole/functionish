/**
 * @module listrecursive
 */

'use strict';

const THIS_NULL = null;

const listrecurse = require('./listrecurse');

/**
 * to do
 * 
 * @example <caption>Example usage of `listrecursive()`</caption>
 * 
 * to do
 * 
 * @function listrecursive
 * @param {function} func The recursive function
 * @returns {function}
 */
function listrecursive(func, ...partialargs) {
    return listrecurse.bind(THIS_NULL, func, ...partialargs);
}

module.exports = listrecursive;