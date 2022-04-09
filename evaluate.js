'use strict';

/**
 * If *expression* is a function, pass *args* to it and return the result. Otherwise, ignore *args* and just return
 * *expression*.
 * 
 * @module evaluate
 * @see {@link module:callable callable()} 
 * @param {any} expression The expression to evaluate
 * @param  {...any} args The arguments to pass to expression if it is a function
 * @returns {function}
 * @example
 *     
 * const evaluate = require('functionish/evaluate')
 * 
 * evaluate(42); // returns 42
 * evaluate(Math.random); // returns a random number between 0 and 1
 * evaluate(); // returns undefined
 * 
 * const iseven = x => (x%2) === 0;
 * evaluate(iseven, 42); // returns true
 */
module.exports = function evaluate(expression, ...args) {
    return (typeof expression === 'function') ? expression(...args) : expression;
}