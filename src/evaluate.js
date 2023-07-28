/**
 * @module evaluate
 */

'use strict';

const isfunction = require('./types/isfunction');

/**
 * If *expression* is a function, pass *args* to it and return the result. Otherwise, ignore *args* and just return
 * *expression*.
 * 
 * [to do: use 'this']
 * 
 * @example <caption>Example usage of `evaluate()`</caption>
 *     
 * const { evaluate } = require('functionish')
 * 
 * evaluate(42); // returns 42
 * evaluate(); // returns undefined
 * 
 * const add = (a,b) => (a+b);
 * evaluate(add, 1, 2); // returns 3
 * 
 * @function evaluate
 * @see {@link module:callable callable()} 
 * @param {any} expression The function or value to evaluate
 * @param  {...any} args The arguments to pass to *expression* if it is a function
 * @returns {function}
 */
function evaluate(expression, ...args) {

    return isfunction(expression)
         ? expression.call(this, ...args)
         : expression;
}

module.exports = evaluate;