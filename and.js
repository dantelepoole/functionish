/**
 * @module and
 */

'use strict';

const isarray = require('./isarray');
const partial = require('./partial');

/**
 * Return a function that passes its arguments to each *clause* and returns `true` if and only if each *clause*
 * returns a truthy false. Otherwise, it returns `false`.
 * 
 * If an array is passed as the only argument, that array is used as the list of clauses to evaluate.
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a falsy value, without evaluating any
 * remaining *clauses*.
 * 
 * If the *clauses* array is empty, the function returns `true`.
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
 * @param {...clause} clauses One or more clauses to test
 * @returns {boolean}
 */
module.exports = function and(...clauses) {

    if( clauses.length === 1 && isarray(clauses[0]) ) clauses = clauses[0];

    const clausecount = clauses.length;

    function _and(index, ...args) {

        return (index >= clausecount)
                ||
               ( !! clauses[index](...args) && _and( index+1, ...args ) );
    }

    return partial(_and, 0);
}
