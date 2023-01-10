/**
 * @module consolidate
 */

'use strict';

/**
 * Return a function that passes *args* to each function in *func* in order and returns the return value
 * of the last function called. The return values of the intermediate functions are silently ignored.
 * 
 * If no functions are passed, the returned function returns its first argument.
 * 
 * This function works like {@link module:tap tap()} except it can tap multiple functions and it returns
 * the return value of the last function called.
 * 
 * @example <caption>Example usage of `consolidate()`</caption>
 * 
 * const { consolidate } = require('consolidate');
 * 
 * function loginvocation1(...args) {
 *     // log the arguments somewhere
 * }
 * 
 * function loginvocation2(...args) {
 *     // log the arguments somewhere else
 * }
 * 
 * function sum(...numbers) {
 *     return numbers.reduce( (a,b) => (a+b), 0 );
 * }
 * 
 * const sum_logged = consolidate(loginvocation1, loginvocation2, sum);
 * 
 * sum_logged(1,2,3,4,5,6,7,8,9,10); // calls the three functions and returns 55
 * 
 * @function consolidate
 * @see {@link module:tap tap()}
 * @param {...function[]} funcs The functions to call
 * @returns {function}
 */
function consolidate(...funcs) {
    
    return function _consolidate(...args) {

        let result = args[0];

        for(const func of funcs) result = func(...args);

        return result;
    }
}

module.exports = consolidate;