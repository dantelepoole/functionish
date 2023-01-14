/**
 * @module call
 */

 'use strict';

 /**
  * Pass *args* to *func* and return the result.
  * 
  * Functional variant of {@link external:Function.prototype.call Function.prototype.call()} except it does not provide
  * for passing a custom `this`-object.
  * 
  * @example <caption>Example usage of `call()`</caption>
  * 
  * const { call } = require('functionish');
  * 
  * const add = (a,b) => (a+b);
  * const sum = (...numbers) => numbers.reduce(add);
  * 
  * call(sum, [1,2,3,4,5,6,7,8,9,10]); // returns 55
  * 
  * @function call
  * @param {function} func The function to call 
  * @param {...any} args The arguments to pass to func
  * @returns {any}
  */
 function call(func, ...args) {

    const _call = func.call(this, ...args);
    
    return _call;
 }

 module.exports = call;