/**
 * @module unless
 */

'use strict';

const curry1 = require('./curry1');
const id = require('./id');
const isfunction = require('./types/isfunction');
const not = require('./logic/not');
const when = require('./when');

const isonfailmissing = args => (args.length < 3);
const notfunction = func => (typeof func !== 'function');

/**
 * The complement to the {@link module:when when()} function, i.e. the *onsuccess* handler applies if the *condition*
 * returns a *falsy* value and the *onfail* handler is applies if the *condition* returns a *truthy* value.
 * 
 * See {@link module:when when()} for further details.
 * 
 * `unless()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `unless()`</caption> 
 *     
 * const { unless } = require('functionish');
 * 
 * const toarray = unless(Array.isArray, x => [x])
 * 
 * toarray( 42 ); // returns [42]
 * toarray( [1,2,3] ); // returns the argument array unaltered
 * 
 * @function unless
 * @see {@link module:when when()}
 * @param {function} condition The condition function
 * @param {any} onsuccess The function to call or value to return if the *condition* evaluates to a falsy value
 * @param {any} onfail The function to call or value to return if the *condition* evaluates to a truthy value
 * @returns {any}
 */
const unless = curry1(function unless(condition, onsuccess, onfail) {

    return notfunction(condition) ? when(!condition, onsuccess, onfail)
         : isonfailmissing(arguments) ? when( not(condition), onsuccess )
         : when( not(condition), onsuccess, onfail );
});

module.exports = unless;