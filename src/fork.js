/**
 * @module fork
 */

'use strict';

const applicable = require('./applicable');
const compose = require('./compose');
const uniadic = require('./uniadic');

const _fork = (forkfuncs, ...args) => forkfuncs.map( applicable(...args) )

/**
 * Return a function that passes its arguments to each *targetfunc* and returns an array holding the return values.
 * 
 * The returned function has a method `join()` that accepts a join-function and returns a new function that passes
 * the array of return values to the join-function as a rest parameter and returns its return value. 
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 * @function fork
 * @param {...function[]} targetfuncs The functions to call
 * @returns {function}
 */
function fork(...targetfuncs) {
    
    const forkrunner = _fork.bind(null, targetfuncs);

    forkrunner.join = joinfunc => compose(uniadic(joinfunc), forkrunner);

    return forkrunner;
}

module.exports = fork;