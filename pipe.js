/**
 * @module pipe
 */

'use strict';

const ERR_BAD_FUNCTION = `PipeError~The function at index %d has type %s. Expected a function.`;

const fail = require('./fail');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const raisebadfunction = (index, func) => fail(ERR_BAD_FUNCTION, index, typeorclass(func));

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

    funcs.forEach( functionvalidatorfactory() );

    return function pipedfunctions(...args) {

        let index = -1;

        while( (index += 1) < funcs.length ) args = [ funcs[index](...args) ];

        return args[0];
    }
}

function functionvalidatorfactory() {

    let index = -1;

    return func => (index += 1, notfunction(func) && raisebadfunction(index, func)); 
}