/**
 * @module logic/nand
 */

'use strict';

const ALWAYS_TRUE = () => true;

const and = require('./and');
const not = require('./not');

/**
 * Return a function that operates as the logical complement of {@link module:logic/and and()}.
 * 
 * The returned function passes its arguments to each *predicate* and returns `true` if at least one
 * predicate returns a falsy value. If all *predicates* return a truthy value, the function returns
 * `false`.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `true`.
 * 
 * @example
 * const nand = require('functionish/logic/nand');
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
 * @param {...any[]} predicates Zero or more predicate functions or values to test
 * @returns {boolean}
 */
module.exports = function nand(...predicates) {
    return predicates.length ? not( and(...predicates) ) : ALWAYS_TRUE;
}