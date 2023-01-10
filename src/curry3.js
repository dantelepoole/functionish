/**
 * @module curry3
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `3`.
 * See {@link module:curry curry()} for more details and example usage.
 * 
 * @function curry3
 * @see {@link module:curry curry()}
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry4 curry4()}
 * @param {(function|string)} func The function to curry
 * @returns {function}
 */
function curry3(func) {
    return curry(3, func);
}

module.exports = curry3;