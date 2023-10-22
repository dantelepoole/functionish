/**
 * @module logic/or
 */

'use strict';

const THIS_NULL = null;

const always = require('../always');
const head = require('../arrays/head');

const disjunctormap = Object.freeze([
    always(false),
    head,
    ([f1, f2]) => (...args) => f1(...args) || f2(...args),
    ([f1, f2, f3]) => (...args) => f1(...args) || f2(...args) || f3(...args),
    ([f1, f2, f3, f4]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args),
    ([f1, f2, f3, f4, f5]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args)
]);

const largedisjunctor = predicates => rundisjunction.bind(THIS_NULL, predicates);

/**
 * Functional variant of Javascript's `||` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a truthy value or, if all
 * *predicates* return falsy values, the return value of the last *predicate*.
 * 
 * Like the `||` operator, `or()` is short-circuited, so it aborts as soon as a *predicate* returns a truthy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
 * 
 * If the *predicates* array is empty, the function returns `false`.
 * 
 * @example <caption>Example usage of `or()`</caption>
 * 
 * const { or } = require('functionish/logic');
 * 
 * const isnumber = x => typeof x === 'number';
 * const isstring = x => typeof x === 'string';
 * 
 * const isstringornumber = or(isnumber, isstring);
 * 
 * isstringornumber(42); // returns true
 * isstringornumber('fortytwo'); // returns true
 * isstringornumber(null) ); // returns false
 * 
 * @function or
 * @see {@link module:logic/and and()}
 * @see {@link module:logic/nor nor()}
 * @param {...any[]} predicates Zero or more predicate functions or values to test
 * @returns {any} The return value of the first predicate to return a truthy value
 */
function or(...predicates) {

    const disjunctor = disjunctormap[predicates.length] ?? largedisjunctor;

    return disjunctor(predicates);
}

function rundisjunction(predicates, ...args) {

    let result = false;

    for(let i = 0; result || i < predicates.length; i += 1) result = predicates[i](...args);

    return result;
}

module.exports = or;