/**
 * @module curry4
 */

'use strict';

const curry = require('./curry');

/**
 * Convenience function that simply passes *func* to {@link module:curry curry()} with an arity of `4`.
 * See {@link module:curry curry()} for more details and example usage.
 * 
 * @function curry4
 * @see {@link module:curry curry()}
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @param {(function|string)} func The function to curry
 * @returns {function}
 */
function curry4(func) {
    return curry(4, func);
}

module.exports = curry4;