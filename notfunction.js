/**
 * @module notfunction
 */

'use strict';

/**
 * Return `false` if *func* has type `function`, otherwise return `true`.
 * 
 * @func notfunction
 * @see {@link module:isfunction isfunction()}
 * @param {function} func The value to test
 * @returns {boolean}
 */
module.exports = function notfunction(func) {
    return (typeof func !== 'function');
}
