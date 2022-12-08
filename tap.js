/**
 * @module tap
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Return a function that passes its arguments to *func*, but ignores *func*'s return value and instead returns the
 * first argument (or `undefined` if no arguments were passed).
 * 
 * @func tap
 * @param {function} func The function to call
 * @returns {any} The first argument passed to the returned function
 */
 module.exports = function tap(func) {

    func = resolvefunction(func);

    return function tappedfunction(...args) {

        func.call(this, ...args);
        
        return args[0];
    }
}
