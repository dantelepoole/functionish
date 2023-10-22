/**
 * @module logic/boolify
 */

'use strict';

/**
 * Coerce *targetfunc*'s return value to type boolean.
 * 
 * This function returns a function that passes its arguments *targetfunc* and returns either `true` or `false`
 * depending on whether *targetfunc* returns a truthy or falsy value respectively.
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
 * @param {function} targetfunc The function to boolify
 * @returns {function}
 */
function boolify(targetfunc) {
    return (...args) => !! targetfunc(...args);
}

module.exports = boolify;