/**
 * @module logic/or
 */

'use strict';

const ALWAYS_FALSE = () => false;
const DISJUNCTION_NONE = undefined;
const TYPE_FUNCTION = 'function';

const always = require('../always');

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
    
    const disjunction = predicates.reduceRight(disjunctreducer, DISJUNCTION_NONE) ?? ALWAYS_FALSE;
    const _or = (...args) => disjunction(...args);

    return _or;
}

function disjunctreducer(disjunction, predicate) {

    if(typeof predicate !== TYPE_FUNCTION) predicate = always(predicate);

    if( !disjunction ) return predicate;

    const disjunct = (...args) => predicate(...args) || disjunction(...args);
    return disjunct;

}

module.exports = or;