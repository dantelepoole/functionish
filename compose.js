/**
 * @module compose
 */

'use strict';

const isarray = require('./isarray');
const pipe = require('./pipe');

/**
 * Compose is implemented in terms of {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
 * from right to left. See {@link module:pipe pipe()} for further information.
 * 
 * If an array is passed as the only argument, the array is presumed to hold the functions to compose.  This allows you
 * to invoke `compose()` both as a variadic function and as a unary function.
 * 
 * The returned function is not curried, so if you require currying of the returned function you must do so yourself.
 * 
 * @example
 * 
 * const compose = require('functionish/compose');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = compose(negate, double, increment); // variadic invocation
 * // OR unary invocation: const allthree = compose( [negate, double, increment] ); 
 * 
 * allthree(42); // returns `-86`
 * 
 * @func compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} funcs One or more functions to compose to a single function
 * @returns {function}
 */

module.exports = function compose(...funcs) {
    
    if( arguments.length === 1 && isarray(funcs[0]) ) funcs = funcs[0];

    funcs.reverse();

    return pipe(funcs);
}