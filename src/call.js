/**
 * @module call
 */

 'use strict';

 /**
  * Functional variant of {@link external:Function.prototype.call Function.prototype.call()}. Pass *args* to
  * *targetfunc* and return the result.
  * 
  * Unlike most functionish functions, `call()` forwards its own `this` value to *targetfunc*.
  * 
  * @example <caption>Example usage of `call()`</caption>
  * 
  * const { call } = require('functionish');
  * 
  * const add = (a,b) => (a+b);
  * const sum = (...numbers) => numbers.reduce(add);
  * 
  * call(sum, 1,2,3,4,5,6,7,8,9,10); // returns 55
  * 
  * @function call
  * @param {function} targetfunc The function to call 
  * @param {...any} args The arguments to pass to *func*
  * @returns {any} *targetfunc*'s return value
  */
 function call(targetfunc, ...args) {
    return targetfunc.call(this, ...args);
 }

 module.exports = call;