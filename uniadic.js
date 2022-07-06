/**
 * @module uniadic
 */

'use strict';

const ERR_BAD_FUNCTION = `UniadicError~The function has type %s. Expected a function.`;
const ERR_BAD_LIST = `UniadicError~The argument has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return a function that accepts a single argument *list* and invokes the *func* function, passing the list
 * as a spread parameter.
 * 
 * Use this function to convert a variadic function that accepts variable number of arguments to a uniadic function
 * whose parameter list consists of a single parameter.
 *
 * If the argument passed to the returned function is not an iterable, an error is thrown. If the returned function is
 * called without an argument, *func* is called without arguments.
 * 
 * @example
 * 
 * const uniadic = require('functionish/uniadic');
 * 
 * const max_uniadic = uniadic(Math.max);
 * 
 * max_uniadic( [1,2,3] ); // returns 3
 * 
 * @func uniadic
 * @see {@link module:variadic variadic()}
 * @param {function} func The function to apply
 * @returns {function}
 */
module.exports = function uniadic(func) {

    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));
    
    return function uniadic_(list=[]) {

        if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));

        return func.call(this, ...list);
    }
}