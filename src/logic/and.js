/**
 * @module logic/and
 */

'use strict';

const CONJUNCTION_NONE = undefined;
const ALWAYS_TRUE = () => true;

const callable = require('../callable');

/**
 * Functional variant of Javascript's `&&` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a falsy value or, if all
 * *predicates* return truthy values, the return value of the last *predicate*.
 * 
 * Like the `&&` operator, `and()` is short-circuited, so it aborts as soon as a *predicate* returns a falsy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `true`.
 * 
 * @example
 * const and = require('functionish/logic/and');
 * 
 * const isnumber = x => typeof x === 'number';
 * const iseven = x => (x%2) === 0;
 * 
 * const isevennumber = and(isnumber, iseven, istuesday);
 * 
 * isevennumber(42); // returns true
 * isevennumber(41); // returns false
 * 
 * @function and
 * @see {@link module:logic/or or()}
 * @param {...any[]} predicates Zero or more predicate functions or values to test
 * @returns {any} The return value of the first predicate to return a falsy value
 */
module.exports = function and(...predicates) {
    return predicates.reduceRight(conjunctreducer, CONJUNCTION_NONE) ?? ALWAYS_TRUE;
}

function conjunctreducer(conjunction, predicate) {

    predicate = callable(predicate);

    return conjunction ? (...args) => predicate(...args) && conjunction(...args)
                       : predicate;
}