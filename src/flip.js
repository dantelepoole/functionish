/**
 * @module flip
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * [to do]
 * 
 * @function flip
 * @param {function} targetfunc The function to flip the arguments of
 * @returns {function}
 */
function flip(targetfunc) {

    return function _flip(a, b, ...args) {

        return (arguments.length === 1)
             ? (b, ...args) => targetfunc(b, a, ...args)
             : targetfunc(b, a, ...args);
    }

}

module.exports = flip;