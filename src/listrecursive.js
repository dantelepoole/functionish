/**
 * @module listrecursive
 */

'use strict';

const partial = require('./partial');
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
    return partial(listrecurse, func, ...partialargs);
}

module.exports = listrecursive;