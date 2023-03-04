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
 * @param {function} func The function to curry
 * @returns {function}
 */
function curry2(func) {
    return curry(2, func);
}

module.exports = curry2;