/**
 * @module whenx
 */

'use strict';

const always = require('./always');
const curry1 = require('./curry1');
const id = require('./id');
const isfunction = require('./types/isfunction');

/**
 * Functionally similar to {@link module:when when()} except this implemenation allows you to pass different arguments
 * for the *condition* and the branches. Like {@link module:when when()}, `whenx()` returns a function that 
 * encapsulates an if-then-else statement. Unlike {@link module:when when()}, however, `whenx()` accepts a single
 * argument to pass to the *condition* and only passes any further arguments to either *truebranch* or *falsebranch*
 * depending on whether the *condition* returned a truthy or falsy value.
 * 
 * It is also possible to pass multiple arguments to the *condition* by passing them to the `for()` method of the
 * returned function. This method will then return either the *truebranch* or the *falsebranch* depending on the
 * *condition*'s boolish return value. The returned branch can then be called separately with its own set of arguments.
 * Note that the returned branch will always be a function, even if the branch itself passed to `whenx()` as a
 * static, non-function value. In that case, the returned branch will ignore its arguments and always returned that
 * static value.
 * 
 * Other than this, `whenx()` behaves identically to {@link module:when when()}.
 * 
 * `whenx()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `whenx()`</caption> 
 * 
 * const { whenx } = require('functionish');
 * 
 * const iseven = x => (x%2) === 0;
 * const product = (...numbers) => numbers.reduce( (a,b) => (a*b), 1 );
 * const sum = (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * 
 * const productorsum = whenx(iseven, product, sum);
 * 
 * productorsum(42, 1, 2, 3, 4, 5); // follows the true branch and returns the product of 120
 * productorsum(41, 1, 2, 3, 4, 5); // follows the false branch and returns the sum of 15
 * 
 * @example <caption>Example usage of the `whenx().for()` method</caption> 
 * 
 * const { whenx } = require('functionish');
 * 
 * const iseven = x => (x%2) === 0;
 * const product = (...numbers) => numbers.reduce( (a,b) => (a*b), 1 );
 * const sum = (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * 
 * const productorsum = whenx(iseven, product, sum);
 * 
 * const productorsum42 = productorsum.for(42);
 * const productorsum41 = productorsum.for(41);
 * 
 * productorsum42(1,2,3,4,5); // follows the true branch and returns the product of 120
 * productorsum41(1,2,3,4,5); // follows the false branch and returns the sum of 15
 * 
 * @function whenx
 * @see {@link module:when when()}
 * @param {any} condition The condition function or value
 * @param {any} truebranch The function to call or value to return if the *condition* evaluates to a truthy value
 * @param {any} falsebranch The function to call or value to return if the *condition* evaluates to a falsy value
 * @returns {function}
 */
const whenx = curry1(function whenx(condition, truebranch, falsebranch) {

    return isfunction(condition) ? _whenx(...arguments)
         : condition ? truebranch
         : falsebranch;
})

function _whenx(condition, truebranch, falsebranch) {

    (arguments.length < 3) && (falsebranch = id);

    return buildwhenx(condition, truebranch, falsebranch);        
}

function buildwhenx(condition, truebranch, falsebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    const _whenx = (conditionarg, ...branchargs) => condition(conditionarg)
                                                  ? truebranch(...branchargs)
                                                  : falsebranch(...branchargs);

    _whenx.for = (...conditionargs) => condition(...conditionargs)
                                     ? truebranch
                                     : falsebranch;

    return _whenx;
}

module.exports = whenx;