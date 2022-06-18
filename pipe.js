/**
 * @module pipe
 */

'use strict';

const idfunctionpipe = function functionpipe(x) { return x; }
/**
 * Return a function that feeds its arguments to the first function in *funcs*, then passes the result to the second
 * function in *funcs*, and so on, until all functions in *funcs* have been called, after which it returns the last
 * function's result.
 * 
 * @example
 * 
 * const pipe = require('functionish/pipe');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = pipe(negate, double, increment);
 * 
 * allthree(42); // returns `-83`
 * 
 * @func pipe
 * @see {@link module:compose compose()}
 * @param  {...function} funcs One or more functions to chain together
 * @returns {function}
 */

module.exports = function pipe(...funcs) {

    if( funcs.length === 0 ) return idfunctionpipe;

    return function functionpipe(...args) {

        let result = funcs[0](...args);
        
        for( let index = 1; index < funcs.length; index += 1 ) result = funcs[index](result);

        return result;

    }
}