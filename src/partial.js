/**
 * @module partial
 */

'use strict';

const THIS_NULL = null;

const curryarity = require('./misc/curryarity');

const willcurry = (func, argcount) => (curryarity(func) >= argcount);

/**
 * [to do: this value]
 * 
 * @example <caption>Example usage of `partial()`</caption>
 * 
 * const partial = require('functionish/partial')
 * 
 * function sum(a,b) {
 *     return (a+b)
 * }
 * 
 * const increment = partial(sum, 1);
 * increment(42); // returns 43
 * 
 * @function partial
 * @param {function} targetfunc The function to partially apply
 * @param  {...any} partialargs Zero or more arguments to partially apply *targetfunc* with
 * @returns {function}
 */
function partial(targetfunc, ...partialargs) {

    return (willcurry(targetfunc, partialargs.length) && targetfunc(...partialargs))
            ||
           targetfunc.bind(THIS_NULL, ...partialargs);

}

module.exports = partial;
