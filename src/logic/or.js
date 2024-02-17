/**
 * @module logic/or
 */

'use strict';

const PREDICATELESS_DISJUNCTOR = () => () => false;

const callable = require('../callable');

const disjunctormap = Object.freeze([
    PREDICATELESS_DISJUNCTOR,
    ([f1]) => f1,
    ([f1,f2]) => (...args) => f1(...args) || f2(...args),
    ([f1,f2,f3]) => (...args) => f1(...args) || f2(...args) || f3(...args),
    ([f1,f2,f3,f4]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args),
    ([f1,f2,f3,f4,f5]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args),
    ([f1,f2,f3,f4,f5,f6]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args) || f6(...args),
    ([f1,f2,f3,f4,f5,f6,f7]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args) || f6(...args) || f7(...args),
    ([f1,f2,f3,f4,f5,f6,f7,f8]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args) || f6(...args) || f7(...args) || f8(...args),
    ([f1,f2,f3,f4,f5,f6,f7,f8,f9]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args) || f6(...args) || f7(...args) || f8(...args) || f9(...args),
    ([f1,f2,f3,f4,f5,f6,f7,f8,f9,f10]) => (...args) => f1(...args) || f2(...args) || f3(...args) || f4(...args) || f5(...args) || f6(...args) || f7(...args) || f8(...args) || f9(...args) || f10(...args)
]);

const getdisjunctor = predicatecount => (disjunctormap[predicatecount] ?? largedisjunctor);

/**
 * Functional variant of Javascript's `||` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a truthy value or, if all
 * *predicates* return falsy values, the return value of the last *predicate*.
 * 
 * Like the `||` operator, `or()` is short-circuited, so it aborts as soon as a *predicate* returns a truthy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be a function or a non-function value. In the latter case, the *predicate*'s boolish value is
 * evaluated.
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

    predicates = predicates.map(callable);

    const disjunctor = getdisjunctor(predicates.length);

    return disjunctor(predicates);
}

function largedisjunctor(funcs) {

    const disjunctorcount = funcs.length;

    return function _or(...args) {

        let success = false;
        
        for(let i = 0; !success && i < disjunctorcount; i += 1) success = funcs[i](...args);

        return success;
    }
}

module.exports = or;