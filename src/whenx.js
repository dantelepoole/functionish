/**
 * @module whenx
 */

'use strict';

const id = require('./id');

/**
 * Similar to {@link module:when when()} except the returned function passes its first argument
 * to the *predicate* and the subsequent arguments to the selected *branch*.
 * 
 * Unlike {@link module:when when()}, `whenx()` requires the *predicate* to be a function.
 * 
 * @example
 *     
 * const whenx = require('functionish/whenx');
 * 
 * const isodd = x => (x%2) === 1;
 * const double = x => (x*2);
 * 
 * const doubleifodd = when(isodd, double);
 * 
 * doubleifodd(42, 5); // returns 5
 * doubleifodd(41, 5); // returns 10
 * 
 * @function whenx
 * @see {@link module:when when()}
 * @see {@link module:unlessx unlessx()}
 * @param {function} predicate The predicate function
 * @param {function} truebranch The function to call if *predicate* is truthy
 * @param {function} [falsebranch] The function to call if *predicate* is falsy
 * @returns {function}
 */
module.exports = function whenx(predicate, truebranch, falsebranch=id) {
    return (x, ...args) => predicate(x) ? truebranch(...args) : falsebranch(...args);
}
