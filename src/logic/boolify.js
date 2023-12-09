/**
 * @module logic/boolify
 */

'use strict';

/**
 * Return a function that passes its arguments to *targetfunc* and casts the return value to type `boolean`.
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