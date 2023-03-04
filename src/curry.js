/**
 * @module curry
 */

'use strict';

const curryfunction = require('../lib/curryfunction');

/**
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @returns {any}
 */
function curry(arity, func) {

    return (arguments.length === 1) ? curryfunction(arity.length - 1, arity)
         : !arity ? curryfunction( func.length - 1, func )
         : curryfunction(arity, func);
}

module.exports = curry;