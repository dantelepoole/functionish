/**
 * @module and
 */

'use strict';

const always = require('./always');
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
    return predicates.reduce(conjunctreducer, alwaystrue);
}

function conjunctreducer(predicate1, predicate2) {

    return notfunction(predicate2) ? conjunctreducer(predicate1, always(!! predicate2))
                                   : (...args) => predicate1(...args) && predicate2(...args);
}