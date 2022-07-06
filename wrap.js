/**
 * @module wrap
 */

'use strict';

const ERR_BAD_TARGETFUNC = `WrapError~The target function has type $s. Expected a function.`;
const ERR_BAD_WRAPPERFUNC = `WrapError~The wrapper function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Return a function that passes *func* and its arguments to *wrapperfunc* and returns the result, allowing
 * wrapperfunc to pre-process *func*'s arguments and/or post-process *func*'s return value.
 * 
 * Both *func* and *wrapperfunc* must be functions. *Wrapperfunc* should have the signature 
 * `wrapperfunc(func, ...args)` and must invoke *func* itself.
 * 
 * `wrap()` is curried by default.
 * 
 * @example
 *     
 * const wrap = require('functionish/wrap');
 * 
 * function dosomething(arg1, arg2) { return 'dosomething was invoked' }
 * 
 * function logwrapper(func, ...args) {
 * 
 * const functionname = func.name;
 * 
 * console.log(`${functionname} called with args:`, args);
 * 
 * try {
 * 
 *     const result = func(...args);
 * 
 *     console.log(`${functionname} completed, return value:`, result);
 * 
 *     return result;
 * 
 *     } catch (error) {
 *         console.error(`${functionname} threw:`, error);
 *         throw error;
 *     }
 * }
 * 
 * const dosomething_logged = wrap(dosomething, logwrapper);
 * 
 * dosomething_logged(42, 'foobar'); // runs logs the arguments, runs dosomething() and logs the result
 * 
 * @func wrap
 * @param {function} func The function to wrap
 * @param {function} wrapperfunc 
 * @returns {function}
 */
module.exports = require('./curry2')(wrap);

function wrap(wrapperfunc, func) {

    if(typeof wrapperfunc !== 'function') fail(ERR_BAD_WRAPPERFUNC, typeorclass(wrapperfunc));
    if(typeof func !== 'function') fail(ERR_BAD_TARGETFUNC, typeorclass(func));

    const wrapname = `wrap[${wrapperfunc.name}] ${func.name}`;

    return {

        [wrapname] : function(...args) {
            return wrapperfunc.call(this, func, ...args);
        }

    }[wrapname]
}
