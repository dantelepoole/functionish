/**
 * @module logic/boolify
 */

'use strict';

/**
 * Coerce *func*'s return value to type boolean.
 * 
 * This function returns a function that passes its arguments *func* and returns either `true` or `false`
 * depending on whether *func* returns a truthy or falsy value respectively.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * boolified function will be curried with the same arity.
 * 
 * @example <caption>Example usage of `boolify()`</caption>
 * 
 * const { boolify } = require('functionish/logic');
 * 
 * const hasitems = boolify( array => array.length );
 * 
 * hasitems( [1,2,3] ); // returns true
 * hasitems( [] ); // return false
 * 
 * @function boolify
 * @param {function} func The function to boolify
 * @returns {function}
 */
function boolify(func) {

    return function _boolifiedfunction(...args) {
        return !! func.call(this, ...args);
    }
}

module.exports = boolify;