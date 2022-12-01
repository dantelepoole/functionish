/**
 * @module or
 */

'use strict';

const always = require('./always');
const isfunction = require('./isfunction');
const notfunction = require('./notfunction');

const alwaysfalse = always(false);

/**
 * Return a function that passes its arguments to each *predicate* and returns `true` if any *predicate*
 * returns a truthy value. Otherwise, it returns `false`.
 * 
 * The function is short-circuited, so it returns as soon as a *predicate* returns a truthy value, without evaluating any
 * remaining *predicates*.
 * 
 * If any *predicate* is not a function, its value is evaluated directly instead.
 * 
 * If the *predicates* array is empty, the function returns `false`.
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
 * @param {...any} predicates Zero or more clauses to test
 * @returns {boolean}
 */

module.exports = function or(...predicates) {
    return predicates.reduce(disjunctreducer, alwaysfalse);
}

function disjunctreducer(predicate1, predicate2) {

    return notfunction(predicate2) ? disjunctreducer(predicate1, always(!! predicate2))
         : (predicate1 === alwaysfalse) ? predicate2
         : (...args) => predicate1(...args) || predicate2(...args);
}