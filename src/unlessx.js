/**
 * @module unlessx
 */

'use strict';

const id = require('./id');
const whenx = require('./whenx');

/**
 * Similar to {@link module:unless unless()} except the returned function passes its first argument
 * to the *predicate* and the subsequent arguments to the selected *branch*.
 * 
 * Unlike {@link module:unless unless()}, `unlessx()` requires the *predicate* to be a function.
 * 
 * @example <caption>Example usage of `unless()`</caption> 
 * 
 * const unlessx = require('functionish/unlessx');
 * 
 * const iseven = x => (x%2) === 0;
 * const double = x => (x*2);
 * 
 * const doubleifodd = unlessx(iseven, double);
 * 
 * doubleifodd(42, 5); // returns 5
 * doubleifodd(41, 5); // returns 10
 * 
 * @function unlessx
 * @see {@link module:unless unless()}
 * @see {@link module:whenx whenx()}
 * @param {function} predicate The predicate function
 * @param {function} mainbranch The function to call if *predicate* is falsy
 * @param {function} [alternativebranch] The function to call if *predicate* is truthy
 * @returns {function}
 */
function unlessx(predicate, mainbranch, alternativebranch=id) {
    return whenx(predicate, alternativebranch, mainbranch);
}

module.exports = unlessx;
