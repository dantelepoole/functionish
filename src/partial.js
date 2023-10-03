/**
 * @module partial
 */

'use strict';

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

    return function _partial(...args) {
        return targetfunc.call(this, ...partialargs, ...args);
    }
}

module.exports = partial;
