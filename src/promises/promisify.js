/**
 * @module promises/promisify
 */

'use strict';

const promise = require('./promise');

/**
 * Return a function that passes its arguments to *func* and returns the result as a Promise.
 * 
 * @function promisify
 * @see {@link promises/promise promise()}
 * @param {function} func The function to promisify
 * @returns {function}
 */
function promisify(func) {
    return promise.bind(null, func);
}

module.exports = promisify;