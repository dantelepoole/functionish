/**
 * Pass *args* to *func* and return the result.
 * 
 * `apply()` is curried by default.
 * 
 * @module apply
 * @see {@link module:applicable applicable()}
 * @param {function} func The function to apply to *args*
 * @param {...any} args The arguments to pass to func
 * @returns {any}
 */

'use strict';

module.exports = require('./curry2') (

    function apply(func, args) {
        return func(...args);
    }
)