/**
 * @module curry4
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that passes *targetfunc* to {@link module:curry curry()} with an arity of `4`.
 * 
 * @function curry1
 * @see {@link module:curry curry()}
 * @param {function} targetfunc The function to curry
 * @returns {function} A currying function
 */
function curry4(targetfunc) {
    return curry(4, targetfunc);
}

module.exports = curry4;