/**
 * @module or
 */

'use strict';

const ALWAYS_FALSE = () => false;
const PREDICATE_NONE = undefined;

const isempty = require('./isempty');
const isfunction = require('./isfunction');

/**
 * Functional variant of Javascript's `||` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a truthy value or, if all
 * *predicates* return falsy values, the return value of the last *predicate*.
 * 
 * Like the `&&` operator, `and()` is short-circuited, so it aborts as soon as a *predicate* returns a truthy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `false`.
 * 
 * @example
 * 
 * const or = require('functionish/or');
 * 
 * const isnumber = x => typeof x === 'number';
 * const isstring = x => typeof x === 'string';
 * 
 * const isstringornumber = or(isnumber, isstring);
 * 
 * console.log( isstringornumber(42) ) // prints 'true'
 * console.log( isstringornumber('fortytwo') ) // prints 'true'
 * console.log( isstringornumber(null) ) // prints 'false'
 * 
 * @func or
 * @see {@link module:and and()}
 * @see {@link module:not not()}
 * @see {@link module:xor xor()}
 * @param {...any} predicates Zero or more clauses to test
 * @returns {boolean}
 */

module.exports = function or(...predicates) {
    return isempty(predicates) ? ALWAYS_FALSE : predicates.reduce(disjunctreducer, PREDICATE_NONE);
}

function disjunctreducer(currentpredicate, nextpredicate) {

    return (currentpredicate === PREDICATE_NONE) ? nextpredicate
         : isfunction(nextpredicate) ? (...args) => currentpredicate(...args) || nextpredicate(...args)
         : (...args) => currentpredicate(...args) || nextpredicate;
}