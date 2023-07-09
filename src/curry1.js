/**
 * @module curry1
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `1`.
 * See {@link module:curry curry()} for more details and example usage.
 * 
 * @function curry1
 * @see {@link module:curry curry()}
 * @param {function} func The function to curry
 * @returns {function}
 */
function curry1(func) {
    return curry(1, func);
}

module.exports = curry1;