/**
 * @module and
 */

'use strict';

const callable = require('./callable');

/**
 * Functional variant of Javascript's `&&` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a falsy value or, if all
 * *predicates* return truthy values, the return value of the last *predicate*.
 * 
 * Like the `||` operator, `or()` is short-circuited, so it aborts as soon as a *predicate* returns a falsy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `true`.
 * 
 * @example
 * 
 * const and = require('functionish/and');
 * 
 * const isnumber = x => typeof x === 'number';
 * const iseven = x => (x%2) === 0;
 * const istuesday = true;
 * 
 * const isevennumberonatuesday = and(isnumber, iseven, istuesday);
 * 
 * isevennumberonatuesday(42); // returns 'true'
 * 
 * @func and
 * @see {@link module:or or()}
 * @see {@link module:not not()}
 * @see {@link module:xor xor()}
 * @param {...function} predicates Zero or more predicate functions to test
 * @returns {boolean}
 */
module.exports = function and(...predicates) {

    predicates = predicates.map(callable);

    return function _and(...args) {

        let result = true;

        for(const predicate of predicates) {
            
            result = predicate(...args);

            if( ! result ) break;
        }

        return result;
    }
}