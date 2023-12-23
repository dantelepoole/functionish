/**
 * @module defer
 */

'use strict';

const ERR_BAD_TARGETFUNC = `functionish/defer(): The target function has type %s. Expected a function.`;

const compose = require('./compose');
const error = require('./errors/error');
const isfunction = require('./types/isfunction');
const raise = require('./errors/raise');
const typeorclassname = require('./types/typeorclassname');

const raisebadtargetfuncerror = compose(raise, error.Type(ERR_BAD_TARGETFUNC), typeorclassname);

/**
 * Return a function that calls *targetfunc* with the specified *args*. This function behaves very similar to
 * {@link module:partial partial()} except that the returned function disregards its own arguments.
 * 
 * @example <caption>Example usage of `defer()`</caption>
 * 
 * const { defer } = require('functionish');
 * 
 * const add = (a,b) => (a+b);
 * const sum = (...numbers) => numbers.reduce(add, 0);
 * 
 * const addition = defer(sum, 1, 2);
 * 
 * addition();      // returns 3
 * addition(4,5,6); // returns 3 (the arguments to addition() are ignored)
 * 
 * @function defer
 * @param {function} targetfunc The function to call
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function}
 */
function defer(targetfunc, ...args) {

    isfunction(targetfunc) || raisebadtargetfuncerror(targetfunc);
    
    return () => targetfunc(...args);
}

module.exports = defer;