/**
 * @module promises/promisify
 */

'use strict';

const curryfunction = require('../../lib/curryfunction');
const promise = require('./promise');

/**
 * Return a function that passes its arguments to *func* and returns the result as a Promise.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * promisified function will be curried with the same arity.
 * 
 * @function promisify
 * @see {@link promises/promise promise()}
 * @param {function} func The function to promisify
 * @returns {function}
 */
function promisify(func) {
    
    const _promisify = (...args) => promise(func, ...args);

    return func.arity
         ? curryfunction(func.length, _promisify)
         : _promisify;
}

module.exports = promisify;