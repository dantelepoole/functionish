/**
 * @module pre
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Return a function that sends its arguments to the *argprocessor* function and passes the returned
 * array to *func* as a rest parameter. If *argprocessor* does not return an array, an error is thrown.
 * 
 * `pre()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `pre()`</caption>
 * 
 * const { pre } = require('functionish');
 * 
 * const double = x => x*2;
 * const sum = (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * 
 * const sumdoubles = pre(double, sum);
 * 
 * sumdoubles(1,2,3); // returns 12;
 * 
 * @function pre
 * @param {function} argprocessor The argument processor function
 * @param {function} func The target function
 * @returns {function}
 */
function pre(argprocessor, func) {
    
    const _pre = (...args) => func( ...argprocessor(...args) );

    return _pre;
}

module.exports = curry2(pre);
