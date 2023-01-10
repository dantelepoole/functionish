/**
 * @module curry2
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `2`.
 * See {@link module:curry curry()} for more details and example usage.
 * 
 * @function curry2
 * @see {@link module:curry curry()}
 * @see {@link module:curry3 curry3()}
 * @see {@link module:curry4 curry4()}
 * @param {(function|string)} func The function to curry
 * @returns {function}
 */
function curry2(func) {
    return curry(2, func);
}

module.exports = curry2;