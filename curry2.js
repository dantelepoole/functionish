/**
 * @module curry2
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `2`.
 * 
 * @func curry2
 * @see {@link module:curry curry()}
 * @see {@link module:curry3 curry3()}
 * @param {function} func The function to curry
 * @returns {function}
 */
module.exports = function curry2(func) {
    return curry(2, func);
}