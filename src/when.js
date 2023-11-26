/**
 * @module when
 */

'use strict';

const curry1 = require('./curry1');
const id = require('./id');

const isfunction = require('./types/isfunction');

/**
 * Return a function that encapsulates an if-then-else statement. The function first passes its arguments to the
 * *condition* and subsequently to either *truebranch* or *falsebranch* depending on whether the *condition&* returned
 * a truthy or falsy value.
 * 
 * The *condition*, *truebranch and *falsebranch* may each be either a function or another value type. If the
 * *condition* is not a function, it is immediately evaluated and *truebranch* or *falsebranch* is returned depending
 * on the *condition*'s boolish value.
 * 
 * If the *condition* is a function, a function is returned that passes its arguments to the *condition* and selects
 * either the *truebranch* or the *falsebranch* depending on the *condition*'s boolish value. If the selected branch
 * is a function, it is called with the same argument. Otherwise, it's value is returned.
 * 
 * If the *condition* is a function that evaluates to a falsy value while the *falsebranch* was omitted, the returned
 * function returns its own first argument. This only applies when the *condition* is a function. In all other case,
 * if the *falsebranch* is omitted it will evaluate to `undefined` instead.
 * 
 * `when()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `when()` with a static condition</caption> 
 *     
 * const { when } = require('functionish');
 * 
 * when(true, 42, 43); // returns 42
 * when(false, 42, 43); // returns 43
 * when(false, 42); // returns undefined
 * 
 * @example <caption>Example usage of `when()` with a condition function</caption> 
 * 
 * const id = x => x;
 * const lift = x => [x];
 * 
 * const toarray = when(Array.isArray, id, lift);
 * toarray( [1,2,3] ); // returns [1,2,3]
 * toarray( 'fubar' ); // returns ['fubar']
 * 
 * @example <caption>Example usage of `when()` with the false-branch omitted</caption> 
 * 
 * const iseven = x => (x%2 === 0)
 * const double = x => (x*2)
 * 
 * const doublewheneven = when(iseven, double);
 * 
 * doublewheneven(42); // returns 84
 * doublewheneven(43); // returns 43 
 * 
 * @function when
 * @param {any} condition The condition function or value
 * @param {any} truebranch The function to call or value to return if the *condition* evalues to a truthy value
 * @param {any} falsebranch The function to call or value to return if the *condition* evalues to a falsy value
 * @returns {function}
 */
const when = curry1(function when(condition, truebranch, falsebranch) {

    return isfunction(condition) ? dynamicwhen(...arguments)
         : condition ? truebranch
         : falsebranch;
})

function dynamicwhen(condition, truebranch, falsebranch) {

    (arguments.length >= 3) || (falsebranch = id);

    return _when.bind(null, condition, truebranch, falsebranch);
}

function _when(condition, truebranch, falsebranch, ...args) {

    const selectedbranch = condition(...args) ? truebranch : falsebranch;

    return isfunction(selectedbranch)
         ? selectedbranch(...args)
         : selectedbranch;
}

module.exports = when;