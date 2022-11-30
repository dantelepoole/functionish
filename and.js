/**
 * @module and
 */

'use strict';

const PREDICATE_NONE = undefined;

const always = require('./always');
const isempty = require('./isempty');
const notfunction = require('./notfunction');

const alwaystrue = always(true);

/**
 * Return a function that passes its arguments to each *predicate* and returns `true` if and only if each *predicate*
 * returns a truthy false. Otherwise, it returns `false`.
 * 
 * The function is short-circuited, so it returns as soon as a *predicate* returns a falsy value, without evaluating any
 * remaining *predicates*.
 * 
 * If any predicate is not a function, its value is evaluated directly instead.
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
    return isempty(predicates) ? alwaystrue : predicates.reduce(conjunctreducer, PREDICATE_NONE);
}

function conjunctreducer(firstpredicate, secondpredicate) {

    return notfunction(secondpredicate) ? conjunctreducer(firstpredicate, always(!! secondpredicate))
         : (firstpredicate === PREDICATE_NONE) ? secondpredicate
         : (...args) => firstpredicate(...args) && secondpredicate(...args);
}