/**
 * @module or
 */

'use strict';

const callable = require('./callable');

/**
 * Return a function that passes its arguments to each *clause* and returns `true` if any *clause*
 * returns a truthy false. Otherwise, it returns `false`.
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a truthy value, without evaluating any
 * remaining *clauses*.
 * 
 * If any clause is not a function, its value is evaluated directly instead.
 * 
 * If the *clauses* array is empty, the function returns `false`.
 * 
 * @example
 * 
 * const or = require('functionish/or');
 * 
 * const isnumber = x => typeof x === 'number';
 * const isstring = x => typeof x === 'string';
 * 
 * const isstringornumber = or(isnumber, isstring);
 * 
 * console.log( isstringornumber(42) ) // prints 'true'
 * console.log( isstringornumber('fortytwo') ) // prints 'true'
 * console.log( isstringornumber(null) ) // prints 'false'
 * 
 * @func or
 * @see {@link module:and and()}
 * @see {@link module:not not()}
 * @see {@link module:xor xor()}
 * @param {...any} clauses One or more clauses to test
 * @returns {boolean}
 */

module.exports = function or(...clauses) {

    callableclauses(clauses);

    return function _or(...args) {

        for( let index = 0; index < clauses.length; index++ ) {

            const clause = clauses[index];
            if( clause(...args) ) return true;
        }

        return false;
    }
}

function callableclauses(clauses) {
    for(let i = 0; i < clauses.length; i += 1) if(typeof clauses[i] !== 'function') clauses[i] = callable(clauses[i]);
}