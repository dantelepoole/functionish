/**
 * Return a function that passes its arguments to each *clause* and returns `true` if any *clause*
 * returns a truthy false. Otherwise, it returns `false`. Each *clause* may be either a function (the result of which
 * is evaluated) or a value to evaluate itself. 
 * 
 * The function is short-circuited, so it returns as soon as a *clause* returns a truthy value, without evaluating any
 * remaining *clauses*.
 * 
 * If the *clauses* array is empty, the function returns `false`.
 * 
 * @module or
 * @see {@link module:and and()}
 * @see {@link module:not not()}
 * @see {@link module:xor xor()}
 * @param {...any} clauses One or more clauses to test
 * @returns {boolean}
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
 */

'use strict';

const evaluate = require('./evaluate');
const partial = require('./partial');

module.exports = function or(...clauses) {

    function _or(index, clauses, ...args) {

        if( index >= clauses.length ) return false;

        const clauseresult = !! evaluate(clauses[index], ...args);

        return clauseresult || _or(index+1, clauses, ...args);
    }

    return partial(_or, 0, clauses);
}
