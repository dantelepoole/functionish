/**
 * @module when
 */

'use strict';

const curry1 = require('./curry1');
const id = require('./id');

const isfunction = require('./types/isfunction');

/**
 * Return a function that encapsulates an if-then-else statement. The function first passes its arguments to the
 * *condition* and subsequently to either *truebranch* or *falsebranch* depending on whether the *condition* returned
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
 * @example <caption>Example usage of `when()`</caption> 
 * 
 * const { when } = require('functionish');
 * 
 * const isallnumeric = (...args) => args.every( x => (typeof x === 'number') );
 * const product = (...numbers) => numbers.reduce( (a,b) => (a*b), 1 );
 * const join = (...args) => args.join( ' ' );
 * 
 * const productorjoin = when(isallnumeric, product, join);
 * 
 * productorjoin(1, 2, 3, 4, 5); // follows the true branch and returns the product of 120
 * productorjoin('1', '2', '3', '4', '5'); // follows the false branch and returns "1 2 3 4 5"
 * 
 * @example <caption>Example usage of `when()` with a static condition</caption> 
 *     
 * const { when } = require('functionish');
 * 
 * when(true, 42, 43); // returns 42
 * when(false, 42, 43); // returns 43
 * when(false, 42); // returns undefined
 * 
 * @example <caption>Example usage of `when()` with the false-branch omitted</caption> 
 * 
 * const { when } = require('functionish');
 * 
 * const notuppercase = str => (str.toUpperCase() !== str);
 * const uppercase = str => str.toUpperCase(); 
 * 
 * const touppercase = when(notuppercase, uppercase);
 * 
 * touppercase('fubar'); // follows the true branch and returns 'FUBAR'
 * touppercase('FUBAR'); // false branch is omitted so the first argument is returned
 * 
 * @function when
 * @see {@link module:whenx whenx()}
 * @param {any} condition The condition function or value
 * @param {any} truebranch The function to call or value to return if the *condition* evaluates to a truthy value
 * @param {any} falsebranch The function to call or value to return if the *condition* evaluates to a falsy value
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