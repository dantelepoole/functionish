/**
 * @module partial
 */

'use strict';

/**
 * Bind the *args* to the *func*-function. This function simply calls *func*'s `bind()` method, but does not provide
 * for also passing a value for *func*'s `this`.
 *  
 * @func partial
 * @param {function} func The function to partially apply
 * @param  {...any} args One or more arguments to partially apply *func* with
 * @returns {function}
 */
module.exports = function partial(func, ...args) {
    return func.bind(null, ...args)
}
