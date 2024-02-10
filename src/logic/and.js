/**
 * @module logic/and
 */

'use strict';

const MAX_PREDICATE_COUNT = 10;
const PREDICATELESS_CONJUNCTOR = () => () => true;

const callable = require('../callable');
const head = require('../arrays/head');

const conjunctormap = Object.freeze([
    PREDICATELESS_CONJUNCTOR,
    head,
    ([f1, f2]) => (...args) => f1(...args) && f2(...args),
    ([f1, f2, f3]) => (...args) => f1(...args) && f2(...args) && f3(...args),
    ([f1, f2, f3, f4]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args),
    ([f1, f2, f3, f4, f5]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args),
    ([f1, f2, f3, f4, f5, f6]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args) && f6(...args),
    ([f1, f2, f3, f4, f5, f6, f7]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args) && f6(...args) && f7(...args),
    ([f1, f2, f3, f4, f5, f6, f7, f8]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args) && f6(...args) && f7(...args) && f8(...args),
    ([f1, f2, f3, f4, f5, f6, f7, f8, f9]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args) && f6(...args) && f7(...args) && f8(...args) && f9(...args),
    ([f1, f2, f3, f4, f5, f6, f7, f8, f9, f10]) => (...args) => f1(...args) && f2(...args) && f3(...args) && f4(...args) && f5(...args) && f6(...args) && f7(...args) && f8(...args) && f9(...args) && f10(...args)
]);

const conjunct = predicates => conjunctormap[predicates.length](predicates);

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

    predicates = predicates.map(callable);

    return (predicates.length > MAX_PREDICATE_COUNT)
         ? batchconjunct(predicates)
         : conjunct(predicates);

}

function batchconjunct(predicates) {

    const batchedpredicates = [];

    for(let i = 0; i < predicates.length; i += MAX_PREDICATE_COUNT) {

        const predicatebatch = predicates.slice(i, i + MAX_PREDICATE_COUNT);
        const predicate = conjunct(predicatebatch);
        
        batchedpredicates.push(predicate);
    }

    return (batchedpredicates.length > MAX_PREDICATE_COUNT)
         ? batchconjunct(batchedpredicates)
         : conjunct(batchedpredicates);
}

module.exports = and;