/**
 * @module or
 */

'use strict';

const isarray = require('./isarray');
const partial = require('./partial');

/**
 * Return a function that passes its arguments to each *clause* and returns `true` if any *clause*
 * returns a truthy false. Otherwise, it returns `false`.
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a truthy value, without evaluating any
 * remaining *clauses*.
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

    if( clauses.length === 1 && isarray(clauses[0]) ) clauses = clauses[0];

    const clausecount = clauses.length;

    function _or(index, ...args) {

        return (index < clausecount)
                &&
               ( !! clauses[index](...args) || _or( index+1, ...args ) );

    }

    return partial(_or, 0);
}
