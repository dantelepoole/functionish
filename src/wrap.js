/**
 * @module wrap
 */

'use strict';

/**
 * Return a function that passes *func* and its arguments to *wrapperfunc* and returns the result, allowing
 * wrapperfunc to pre-process *func*'s arguments and/or post-process *func*'s return value.
 * 
 * Both *func* and *wrapperfunc* must be functions. *Wrapperfunc* should have the signature 
 * `wrapperfunc(func, ...args)` and must invoke *func* itself.
 * 
 * @example
 *     
 * const wrap = require('functionish/wrap');
 * 
 * function getdata(...args) { return 'foobar' }
 * 
 * const trace = wrap(
 *    function trace(func, ..args) {
 *    
 *        console.log(func.name, 'called with', args);
 *    
 *        const result = func.call(this, ...args);
 *    
 *        console.log(func.name, 'returned', result);
 *    
 *        return result;
 *    }
 * )
 * 
 * const getdata_traced = trace(getdata);
 * 
 * getdata_traced(42,236);
 * // prints "getdata called with [42,236]"
 * // then prints "getdata returned 'foobar'"
 * // then returns 'foobar'
 * 
 * @func wrap
 * @param {function} wrapperfunc The function to wrap *func* with
 * @param {function} func The function to wrap
 * @returns {function}
 */
module.exports = function wrap(wrapperfunc, func) {
    return (...args) => wrapperfunc(func, ...args);
}
