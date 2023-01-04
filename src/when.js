/**
 * @module when
 */

'use strict';

const id = require('./id');
const isfunction = require('./types/isfunction');

/**
 * Return a function that runs the *mainbranch* unless the *predicate* resolves to a false value, in
 * which case it runs *alternativebranch*.
 * 
 * If *predicate* is a function, the returned function passes its arguments to it. Otherwise, *predicate*'s
 * value is evaluated directly. The returned function subsequently passes its arguments to either *mainbranch*
 * or *alternativebranch*, depending on the result of evaluating the *predicate*.
 * 
 * If no *alternativebranch* is provided, the returned function simply returns its first argument instead.
 * 
 * @example
 *     
 * const when = require('functionish/when');
 * 
 * const isodd = x => (x%2) === 1;
 * const increment = x => (x+1);
 * 
 * const coercetoeven = when(isodd, increment);
 * 
 * coercetoeven(42); // returns 42
 * coercetoeven(41); // returns 42
 * 
 * @function when
 * @see {@link module:unless unless()}
 * @param {any} predicate The predicate expression
 * @param {function} truebranch The function to call if *predicate* is truthy
 * @param {function} [falsebranch] The function to call if *predicate* is falsy
 * @returns {function}
 */
module.exports = function when(predicate, truebranch, falsebranch=id) {

    return isfunction(predicate)
         ? (...args) => predicate(...args) ? truebranch(...args) : falsebranch(...args)
         : (...args) => predicate ? truebranch(...args) : falsebranch(...args);
}