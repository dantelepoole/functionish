/**
 * @module unless
 */

'use strict';

const id = require('./id');
const when = require('./when');

/**
 * Return a function that runs the *mainbranch* unless the *predicate* resolves to a truthy value, in
 * which case it runs *alternativebranch*.
 * 
 * If *predicate* is a function, the returned function passes its arguments to it. Otherwise, *predicate*'s
 * value is evaluated directly. The returned function subsequently passes its arguments to either *mainbranch*
 * or *alternativebranch*, depending on the result of evaluating the *predicate*.
 * 
 * If no *alternativebranch* is provided, the returned function simply returns its first argument instead.
 * 
 * @example
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
 * @param {any} predicate The predicate expression
 * @param {function} alternativebranch The function to call if *predicate* is falsy
 * @param {function} [mainbranch] The function to call if *predicate* is truthy
 * @returns {function}
 */
module.exports = function unless(predicate, mainbranch, alternativebranch=id) {
    return when(predicate, alternativebranch, mainbranch);
}
