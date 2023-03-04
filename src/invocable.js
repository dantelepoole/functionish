/**
 * @module invocable
 */

'use strict';

const invoke = require('./invoke');
const partial = require('./partial');

/**
 * Return a function that passes its arguments to *func* and returns a 2-element array
 * containing *func*'s return value as the first element and the error it throws (if any) in
 * the second element.
 * 
 * If `func` throws, the first element of the returned array will be `undefined`.
 * 
 * @example <caption>Example usage of `invocable()`</caption>
 * 
 * const { invocable } = require('functionish');
 * 
 * function getuserfromdb(userid) { ... }
 * 
 * const getuserfromdb_safe = invocable(getuserfromdb);
 * 
 * const [user, error] = getuserfromdb_safe(42);
 * 
 * console.log(error ?? user); // if an error is thrown, print it, otherwise print the user 
 * 
 * @function invocable
 * @see {@link module:invoke invoke()}
 * @param {function} func The function to invoke 
 * @returns {function}
 */
function invocable(func) {
    return partial(invoke, func);
}

module.exports = invocable;