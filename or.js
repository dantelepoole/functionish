/**
 * @module or
 */

'use strict';

const always = require('./always');
const callable = require('./callable');
const reduce = require('./reduce');

const defaultpredicate = always(false);
const isdefaultpredicate = func => (func === defaultpredicate);

const disjunctionfactory = reduce(disjunctingreducer, defaultpredicate);

const disjunct = (predicate1, predicate2) => (...args) => (predicate1(...args) || predicate2(...args));

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
    return disjunctionfactory(predicates);
}

function disjunctingreducer(predicate1, predicate2) {

    predicate2 = callable(predicate2);

    return isdefaultpredicate(predicate1) ? predicate2 : disjunct(predicate1, predicate2);
}

// (predicate1, predicate2) => [predicate1, callable(predicate2)]
// when(
// compose(isdefaultpredicate, head),
// pop,
// disjunct,
// )