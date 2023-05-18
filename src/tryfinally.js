/**
 * @module tryfinally
 */

'use strict';

const ONERROR_NONE = undefined;

const curry = require('./curry');
const trycatchfinally = require('./trycatchfinally');

/**
 * to do
 * 
 * @example <caption>Example usage of `tryfinally()`</caption>
 * 
 * to do
 * 
 * @function tryfinally
 * @param {function} onfinally to do
 * @param {function} func The function to run
 * @returns {any}
 */
function tryfinally(onfinally, func, ...partialargs) {
    return trycatchfinally(ONERROR_NONE, onfinally, func, ...partialargs);
}

module.exports = curry(1, tryfinally);