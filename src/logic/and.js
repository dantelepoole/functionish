/**
 * @module logic/and
 */

'use strict';

const THIS_NULL = null;

const always = require('../always');
const callable = require('../callable');
const head = require('../arrays/head');

const allcallable = array => array.map(callable);

const alwaystrue = always(true);

const conjunctormap = Object.freeze([
    always(alwaystrue),
    head,
    ([f1, f2]) => (...args) => f1(...args) && f2(...args),
    ([f1, f2, f3]) => (...args) => f1(...args) && f2(...args) && f3(...args),
    ([f1, f2, f3, f4]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args),
    ([f1, f2, f3, f4, f5]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args)
]);

const largeconjunctor = predicates => runconjunction.bind(THIS_NULL, predicates);

/**
 * Functional variant of Javascript's `&&` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a falsy value. If all
 * *predicates* return truthy values, the last *predicate*'s return value is returned.
 * 
 * Like the `&&` operator, `and()` is short-circuited, so it aborts as soon as a *predicate* returns a falsy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be a function or a non-function value. In the latter case, the *predicate*'s boolish value is
 * evaluated.
 * 
 * If the *predicates* array is empty, the function returns `true`.
 * 
 * @example <caption>Example usage of `and()`</caption>
 * 
 * const { and } = require('functionish/logic');
 * 
 * const isnumber = x => typeof x === 'number';
 * const iseven = x => (x%2) === 0;
 * 
 * const isevennumber = and(isnumber, iseven);
 * 
 * isevennumber(42); // returns true
 * isevennumber(41); // returns false
 * 
 * and()(); // returns true;
 * 
 * @function and
 * @see {@link module:logic/or or()}
 * @param {...any[]} predicates The predicate functions
 * @returns {any} The return value of the first predicate to return a falsy value
 * @throws {Error} if any *predicate* is not a function
 */
function and(...predicates) {

    const conjunctor = conjunctormap[predicates.length] ?? largeconjunctor;

    return conjunctor( allcallable(predicates) );
}

function runconjunction(predicates, ...args) {

    let result = true;

    for(let i = 0; result && i < predicates.length; i += 1) result = predicates[i](...args);

    return result;
}

module.exports = and;