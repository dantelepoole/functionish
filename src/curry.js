/**
 * @module curry
 */

'use strict';

const DEFAULT_ARITY = 2;
const NULLARY_ARITY = 0;
const TYPE_STRING = 'string';

const callorcurry = require('../lib/callorcurry');
const loadfunction = require('./loadfunction');

/**
 * Return a curried variant of the *func* function that curries at least *arity* arguments before applying *func* and
 * returning the result.
 * 
 * You may pass only the function to curry. In that case, `curry()` will retrieve the arity from the function's
 * `length` property. However, a function's `length` property does not count a spread parameter, default parameters
 * nor any parameters following the first default parameter in the parameter list. This can lead to unexpected currying
 * results (even more so when composing a curried function with other functions). As a best practice, always pass an
 * explicit *arity*. Functionish provides the convenience functions `curry2()`, `curry3()` and `curry4()`, which set the
 * appropriate arity for you.
 * 
 * If *arity* is `0`, the `curry()` also reverts to *func*'s `length` property. If *func*'s `length`
 * property is also `0`, `curry()` defaults to a binary arity.
 * 
 * If the *func* argument is a string, `curry()` will attempt to `require()` the function by passing *func*
 * to {@link module:loadfunction loadfunction()}. See {@link module:loadfunction loadfunction()} for more
 * details.
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * const { curry } = require('functionish');
 *
 * const sum = curry( 2, (a,b) => (a+b) );
 * 
 * const increment = sum(1);
 * 
 * increment(42); // returns 43
 *  
 * @example <caption>Example usage of `curry()` with a string argument instead of a function</caption>
 * 
 * const { curry } = require('functionish');
 * 
 * const format = curry(2, 'util#format'); // curry the `format()`-method of NodeJS' `util`-package
 * 
 * const formattederrormessage = format(`An error occurred: %s`);
 * 
 * throw new Error( formattederrormessage('foobar') );
 * // throws an error with the message: An error occurred: foobar
 * 
 * @function curry
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @see {@link module:curry4 curry4()}
 * @param {number} arity The number of arguments to curry
 * @param {(function|string)} func The function to curry
 * @returns {function}
 */
function curry(arity, func) {

    return (arguments.length < 2) ? curry(NULLARY_ARITY, arity)
         : (typeof func === TYPE_STRING) ? curry(arity, loadfunction(func))
         : callorcurry( (arity || func.length || DEFAULT_ARITY), func );
}

module.exports = curry;