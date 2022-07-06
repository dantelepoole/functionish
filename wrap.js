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
