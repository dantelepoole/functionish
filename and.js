/**
 * @module and
 */

'use strict';

const PATH_CALLABLE = __dirname + '/callable';

const map = require('./map');

const callable = map(PATH_CALLABLE);

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

    predicates = callable(predicates);

    return function and_(...args) {

        for(const predicate of predicates) if( ! predicate.call(this, ...args) ) return false;

        return true;
    }
}