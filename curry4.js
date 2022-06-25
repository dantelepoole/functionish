/**
 * @module curry4
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an quaternary arity.
 * 
 * @func curry4
 * @see {@link module:curry curry()}
 * @see {@link module:curry2 curry2()}
 * @param {function} func The function (or `require()`-like path to the function) to curry
 * @returns {function}
 */
module.exports = function curry4(func) {
    return curry(4, func);
}