/**
 * @module errors/raise
 */

'use strict';

/**
 * Functional variant of Javascript's `throw` operator.
 * 
 * @example <caption>Example usage of `raise()`</caption>
 * 
 * raise( new Error() ); // throws the new Error
 * 
 * @function raise
 * @param {any} error The value to throw
 * @throws {any} The argument
 */
function raise(error) {
    throw error;
}

module.exports = raise;