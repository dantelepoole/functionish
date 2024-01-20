/**
 * @module when
 */

'use strict';

const callable = require('./callable');
const curry1 = require('./curry1');
const id = require('./id');

const initselectaction = (condition, action, alternate) => (...args) => (condition(...args) && action || alternate);
const isfunction = require('./types/isfunction');

/**
 * Return a function that encapsulates an if-then-else statement. The function first passes its arguments to the
 * *condition* and subsequently to either *onsuccess* or *onfail* depending on whether the *condition* returned
 * a truthy or falsy value.
 * 
 * The *condition*, *onsuccess* and *onfail* may each be either a function or another value type. If the
 * *condition* is not a function, it is immediately evaluated and *onsuccess* or *onfail* is returned depending
 * on the *condition*'s boolish value.
 * 
 * If the *condition* is a function, a function is returned that passes its arguments to the *condition* and selects
 * either the *onsuccess* or the *onfail* depending on the *condition*'s boolish value. If the selected action
 * is a function, it is called with the same argument. Otherwise, it's value is returned.
 * 
 * If the *condition* function evaluates to a falsy value and the *onfail* was omitted, the returned
 * function returns its own first argument. This only applies when the *condition* is a function. Otherwise,
 * if the *onfail* is omitted it will evaluate to `undefined` instead.
 * 
 * The returned function has a `for()`-method that allows you to pass different arguments to the *condition* and the
 * selected action. The arguments passed to the `for()`-method are passed to the *condition*, while the arguments
 * passed to the returned function are passed to the selected action.
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
 * @example <caption>Example usage of `when()` with the `onfail` actoin omitted</caption> 
 * 
 * const { when } = require('functionish');
 * 
 * const notuppercase = str => (str.toUpperCase() !== str);
 * const uppercase = str => str.toUpperCase(); 
 * 
 * const touppercase = when(notuppercase, uppercase);
 * 
 * touppercase('fubar'); // executes the onsuccess-action and returns 'FUBAR'
 * touppercase('FUBAR'); // the onfail-action was omitted so the first argument is returned
 * 
 * @example <caption>Example usage of `when()`'s `for()`-method</caption> 
 * 
 * const iseven = x => (x%2) === 0;
 * const product = (...numbers) => numbers.reduce( (a,b) => (a*b), 1 );
 * const sum = (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * 
 * const productorsum = when(iseven, product, sum);
 * 
 * productorsum.for(42)(1, 2, 3, 4, 5); // pass 42 to the condition and returns the product of 120 (onsuccess)
 * productorsum.for(41)(1, 2, 3, 4, 5); // pass 41 to the condition and returns the sum of 15 (onfail)
 * 
 * @function when
 * @param {any} condition The condition function or value
 * @param {any} onsuccess The function to call or value to return if the *condition* evaluates to a truthy value
 * @param {any} onfail The function to call or value to return if the *condition* evaluates to a falsy value
 * @returns {function}
 */
const when = curry1(function when(condition, onsuccess, onfail) {

    if( isfunction(condition) ) return initwhen(...arguments, id);

    let result = onsuccess;

    condition || (result = onfail);

    return result;
})

function initwhen(condition, onsuccess, onfail) {

    const selectaction = initselectaction(condition, callable(onsuccess), callable(onfail));

    const _when = (...args) => selectaction(...args)(...args);
    _when.for = (...args) => (...actionargs) => selectaction(...args)(...actionargs);
    
    return _when;
}

module.exports = when;