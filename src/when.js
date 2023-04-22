/**
 * @module when
 */

'use strict';

const TYPE_FUNCTION = 'function';

const always = require('./always');
const curry = require('./curry');
const id = require('./id');

/**
 * Return a function that runs the *mainbranch* unless the *condition* resolves to a false value, in
 * which case it runs *alternativebranch*.
 * 
 * If *condition* is a function, the returned function passes its arguments to it. Otherwise, *condition*'s
 * value is evaluated directly. The returned function subsequently passes its arguments to either *mainbranch*
 * or *alternativebranch*, depending on the result of evaluating the *condition*.
 * 
 * If no *alternativebranch* is provided, the returned function simply returns its first argument instead.
 * 
 * `when()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `when()`</caption> 
 *     
 * const { when } = require('functionish');
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
 * @see {@link module:whenx whenx()}
 * @param {any} condition The condition expression
 * @param {function} truebranch The function to call if *condition* is truthy
 * @param {function} [falsebranch] The function to call if *condition* is falsy
 * @returns {function}
 */
function when(condition, truebranch, falsebranch=id) {

    if(typeof condition !== TYPE_FUNCTION) condition = always(condition);

    return function _when(...args) {
        
        return condition.call(this, ...args)
             ? truebranch.call(this, ...args)
             : falsebranch.call(this, ...args);
    }
}

module.exports = curry(1, when);