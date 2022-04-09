'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `2`.
 * 
 * @module curry2
 * @see {@link module:curry curry()}
 * @see {@link module:curry1 curry1()}
 * @see {@link module:curry3 curry3()}
 * @param {function} func The function to curry
 * @returns {function}
 */
module.exports = function curry2(func) {
    return curry(2, func);
}