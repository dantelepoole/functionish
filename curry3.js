/**
 * @module curry3
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `3`.
 * 
 * @func curry3
 * @see {@link module:curry curry()}
 * @see {@link module:curry2 curry2()}
 * @param {function} func The function (or `require()`-like path to the function) to curry
 * @returns {function}
 */
module.exports = function curry3(func) {
    return curry(3, func);
}