'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `1`.
 * 
 * @module curry1
 * @see {@link module:curry curry()}
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @param {function} func The function to curry
 * @returns {function}
 */
module.exports = function curry1(func) {
    return curry(1, func);
}