/**
 * @module and
 */

'use strict';

const callable = require('./callable');

/**
 * Return a function that passes its arguments to each *clause* and returns `true` if and only if each *clause*
 * returns a truthy false. Otherwise, it returns `false`.
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a falsy value, without evaluating any
 * remaining *clauses*.
 * 
 * If any clause is not a function, its value is evaluated directly instead.
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
 * @param {...function} clauses One or more predicate functions to test
 * @returns {boolean}
 */
module.exports = function and(...clauses) {

    callableclauses(clauses);

    return function _and(...args) {

        for( let index = 0; index < clauses.length; index++ ) {

            const clause = clauses[index];
            if( ! clause(...args) ) return false;
        }

        return true;
    }
}

function callableclauses(clauses) {
    for(let i = 0; i < clauses.length; i += 1) if(typeof clauses[i] !== 'function') clauses[i] = callable(clauses[i]);
}