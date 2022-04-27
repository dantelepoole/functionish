/**
 * @module pipe
 */

'use strict';

const head = require('./head');
const id = require('./id');
const isarray = require('./isarray');
const isempty = require('./isempty');
 
/**
 * Return a function that feeds its arguments to the first function in *funcs*, then passes the result to the second
 * function in *funcs*, and so on, until all functions in *funcs* have been called, after which it returns the last
 * function's result.
 * 
 * If an array is passed as the only argument, the array is presumed to hold the functions to pipe.  This allows you
 * to invoke `pipe()` as a unary function.
 * 
 * The returned function is not curried, so if you require currying of the returned function you must do so yourself.
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

    if( arguments.length === 1 && isarray(funcs[0]) ) funcs = funcs[0];

    if( isempty(funcs) ) return id;

    function functionchain(...args) {

        let results = args;

        for( const func of funcs ) results = [ func(...results) ]; 
        
        return head(results);
    }

    return functionchain;
}