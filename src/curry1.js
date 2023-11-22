/**
 * @module curry1
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that passes *targetfunc* to {@link module:curry curry()} with an arity of `1`.
 * 
 * @function curry1
 * @see {@link module:curry curry()}
 * @param {function} targetfunc The function to curry
 * @returns {function}
 */
function curry1(targetfunc) {
    return curry(1, targetfunc);
}

module.exports = curry1;