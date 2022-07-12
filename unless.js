/**
 * @module unless
 */

'use strict';

const callable = require('./callable');
const evaluate = require('./evaluate');
const id = require('./id');
const when = require('./when');

module.exports = require('./curry2')(unless);

/**
 * Return a function that passes its arguments to *predicate*. If *predicate* returns a falsy value, the function
 * passes its arguments to *mainbranch* and returns the result. If *predicate* returns a truthy value, the function
 * passes its arguments to *alternativebranch* and returns the result. If no *alternativebranch* is provided, the
 * function returns its first argument. `unless()` therefore operates opposite to {@link module:when when()}.
 * 
 * If *predicate* or either branch are not functions, their value is evaluated directly and any arguments passed to
 * the returned function are ignored.
 * 
 * `unless()` is curried by default.
 * 
 * @example
 *     
 * const unless = require('functionish/unless');
 * 
 * const iseven = x => (x%2) === 0;
 * const increment = x => (x+1);
 * 
 * const coercetoeven = unless(iseven, increment);
 * 
 * coercetoeven(42); // returns 42
 * coercetoeven(41); // returns 42
 * 
 * @func unless
 * @see {@link module:when when()}
 * @param {(function|any)} predicate The predicate expression
 * @param {(function|any)} mainbranch The expression to evaluate if *predicate* is falsy
 * @param {(function|any)} [alternativebranch] The expression to evaluate if *predicate* is truthy
 * @returns {any}
 */
function unless(predicate, mainbranch, alternativebranch=id) {
    return when(predicate, alternativebranch, mainbranch);
}
