/**
 * @module logic/nor
 */

'use strict';

const not = require('./not');
const or = require('./or');

/**
 * Return a function that operates as the logical complement of {@link module:logic/or or()}.
 * 
 * The returned function passes its arguments to each *predicate* and returns `true` if none of the
 * *predicates* return a truthy value. If any *predicate* returns a truthy value, the function returns
 * `false`.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `true`.
 * 
 * @example <caption>Example usage of `nor()`</caption>
 * 
 * const { nor } = require('functionish/logic');
 * 
 * const isnumber = x => typeof x === 'number';
 * const isstring = x => typeof x === 'string';
 * 
 * const neitherstringnornumber = nor(isnumber, isstring);
 * 
 * neitherstringnornumber(42); // returns false
 * neitherstringnornumber('fortytwo'); // returns false
 * neitherstringnornumber(null) ); // returns true
 * 
 * @function nor
 * @see {@link module:logic/or or()}
 * @param {...any[]} predicates Zero or more predicate functions or values to test
 * @returns {boolean}
 */
function nor(...predicates) {
    return not( or(...predicates) );
}

module.exports = nor;