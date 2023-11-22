/**
 * @module curry2
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that passes *targetfunc* to {@link module:curry curry()} with an arity of `2`.
 * 
 * @function curry2
 * @see {@link module:curry curry()}
 * @param {function} targetfunc The function to curry
 * @returns {function}
 */
function curry2(targetfunc) {
    return curry(2, targetfunc);
}

module.exports = curry2;