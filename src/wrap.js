/**
 * @module wrap
 */

'use strict';

const curry2 = require('./curry2');
const curryfunction = require('../lib/curryfunction');

/**
 * Return a function that passes *func* and its arguments to *wrapperfunc* and returns the result, allowing
 * wrapperfunc to pre-process *func*'s arguments and/or post-process *func*'s return value.
 * 
 * Both *func* and *wrapperfunc* must be functions. *Wrapperfunc* should have the signature 
 * `wrapperfunc(func, ...args)` and must invoke *func* itself.
 * 
 * `wrap()` is curried by default with binary arity. Also, currying is preserved. If *func* has 
 * been curried (i.e. it has been passed to {@link module:curry curry()}), the returned function will
 * be curried with the same arity.
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * const { wrap } = require('functionish');
 * 
 * const getdata = (...args) => 'foobar';
 * 
 * const trace = wrap(
 * 
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
 * @function wrap
 * @param {function} wrapperfunc The function to wrap *func* with
 * @param {function} func The function to wrap
 * @returns {function}
 */
function wrap(wrapperfunc, func) {
    
    const _wrap = (...args) => wrapperfunc(func, ...args);

    return func.arity
         ? curryfunction(func.arity, _wrap)
         : _wrap;
}

module.exports = curry2(wrap);
