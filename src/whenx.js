/**
 * @module whenx
 */

'use strict';

const curry = require('./curry');
const id = require('./id');

/**
 * Similar to {@link module:when when()} except the returned function passes its first argument
 * to the *condition* and the subsequent arguments to the selected *branch*.
 * 
 * Unlike {@link module:when when()}, `whenx()` requires the *condition* to be a function.
 * 
 * `whenx()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `whenx()`</caption>
 *     
 * const { whenx } = require('functionish');
 * 
 * const isodd = x => (x%2) === 1;
 * const double = x => (x*2);
 * 
 * const doubleifodd = whenx(isodd, double);
 * 
 * doubleifodd(42, 5); // returns 5
 * doubleifodd(41, 5); // returns 10
 * 
 * @function whenx
 * @see {@link module:when when()}
 * @see {@link module:unlessx unlessx()}
 * @param {function} condition The predicate function
 * @param {function} truebranch The function to call if *predicate* is truthy
 * @param {function} [falsebranch] The function to call if *predicate* is falsy
 * @returns {function}
 */
function whenx(condition, truebranch, falsebranch=id) {
    
    return function _whenx(conditionarg, ...branchargs) {
        
        return condition.call(this, conditionarg)
             ? truebranch.call(this, ...branchargs)
             : falsebranch.call(this, ...branchargs);
    }
}

module.exports = curry(1, whenx);