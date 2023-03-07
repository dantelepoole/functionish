/**
 * @module logic/and
 */

'use strict';

const ALWAYS_TRUE = () => true;
const CONJUNCTION_NONE = undefined;
const TYPE_FUNCTION = 'function';

const always = require('../always');

/**
 * Functional variant of Javascript's `&&` operator. Returns a function that passes its arguments to each
 * *predicate* and returns the return value of the first *predicate* that returns a falsy value. If all
 * *predicates* return truthy values, the last *predicate*'s return value is returned.
 * 
 * Like the `&&` operator, `and()` is short-circuited, so it aborts as soon as a *predicate* returns a falsy
 * value, without evaluating the remaining *predicates*.
 * 
 * A *predicate* may be either a function to be called or any other value. In the latter case, the value
 * is evaluated directly.
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
 * @function and
 * @see {@link module:logic/or or()}
 * @see {@link module:logic/nand nand()}
 * @param {...any[]} predicates Zero or more predicate functions or values to test
 * @returns {any} The return value of the first predicate to return a falsy value
 */
function and(...predicates) {

    const conjunction = predicates.reduceRight(conjunctreducer, CONJUNCTION_NONE) ?? ALWAYS_TRUE;
    
    const _and = (...args) => conjunction(...args);

    return _and;
}

function conjunctreducer(conjunction, predicate) {

    if(typeof predicate !== TYPE_FUNCTION) predicate = always(predicate);

    if( !conjunction ) return predicate;

    const conjunct = (...args) => predicate(...args) && conjunction(...args);

    return conjunct;
}

module.exports = and;