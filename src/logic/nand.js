/**
 * @module logic/nand
 */

'use strict';

const and = require('./and');
const not = require('./not');

/**
 * Return a function that operates as the logical complement of {@link module:logic/and and()}.
 * 
 * The returned function passes its arguments to each *predicate* and returns `true` if at least one
 * predicate returns a falsy value. If all *predicates* return a truthy value, the function returns
 * `false`.
 * 
 * If the *predicates* array is empty, the function returns `false`.
 * 
 * @example <caption>Example usage of `nand()`</caption>
 * 
 * const { nand } = require('functionish/logic');
 * 
 * const isnumber = x => typeof x === 'number';
 * const iseven = x => (x%2) === 0;
 * 
 * const notevennumber = nand(isnumber, iseven);
 * 
 * notevennumber(42); // returns false
 * notevennumber(41); // returns true
 * notevennumber('foobar'); // returns true
 * 
 * @function nand
 * @see {@link module:logic/and and()}
 * @param {...any[]} predicates The predicate functions to test
 * @returns {boolean}
 */
function nand(...predicates) {
    return not( and(...predicates) );   
}

module.exports = nand;