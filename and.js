/**
 * Return a function that passes its arguments to each *clause* and returns `true` if and only if each *clause*
 * returns a truthy false. Otherwise, it returns `false`. Each *clause* may be either a function (the result of which
 * is evaluated) or a value to evaluate itself. 
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a falsy value, without evaluating any
 * remaining *clauses*.
 * 
 * If the *clauses* array is empty, the function returns `true`.
 * 
 * @module and
 * @see {@link module:or or()}
 * @see {@link module:not not()}
 * @see {@link module:xor xor()}
 * @param {...any} clauses One or more clauses to test
 * @returns {boolean}
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
 * console.log( isevennumberonatuesday(42) ) // prints 'true'
 * 
 */

'use strict';

const evaluate = require('./evaluate');
const partial = require('./partial');

module.exports = function and(...clauses) {

    function _and(index, clauses, ...args) {
        
        if( index >= clauses.length ) return true;

        const clauseresult = !! evaluate(clauses[index], ...args);
        
        return clauseresult && _and(index+1, clauses, ...args);
    }

    return partial(_and, 0, clauses);
}
