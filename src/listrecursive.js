/**
 * @module listrecursive
 */

'use strict';

const CONTEXT_NONE = undefined;

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
    return listrecurse.bind(CONTEXT_NONE, func, ...partialargs);
}

module.exports = listrecursive;