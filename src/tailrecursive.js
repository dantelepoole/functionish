/**
 * @module tailrecursive
 */

'use strict';

const partial = require('./partial');
const tailrecurse = require('./tailrecurse');

/**
 * to do
 * 
 * @example <caption>Example usage of `recursive()`</caption>
 * 
 * to do
 * 
 * @function tailrecursive
 * @param {function} func The recursive function
 * @returns {function}
 */
function tailrecursive(func, ...partialargs) {
    return partial(recurse, func, ...partialargs);
}

module.exports = tailrecursive;