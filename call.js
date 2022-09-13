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
  * @example
  * 
  * const call = require('functionish/call');
  * 
  * function sum(...numbers) { return numbers.reduce( (a,b) => (a+b), 0 ) }
  * 
  * call(sum, [1,2,3,4,5,6,7,8,9,10]); // returns 55
  * 
  * @func call
  * @param {function} func The function to call 
  * @param {...any} args The arguments to pass to func
  * @returns {any} *func*'s return value
  */
 
 module.exports = function call(func, ...args) {
     return func.call(this, ...args);
 }