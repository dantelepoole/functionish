/**
 * @module curry
 */

'use strict';

const ARITY_NONE = undefined;
const ERR_BAD_ARITY = "CurryError~The arity has type %s. Expected a number.";
const ERR_BAD_FUNCTION = "CurryError~The value at '%s' has type %s. Expected a function.";

const fail = require('./fail');
const partial = require('./partial');
const typeorclass = require('./typeorclass');

/**
 * Return a curried variant of the *func* function that curries at least *arity* arguments before applying *func* and
 * returning the result.
 * 
 * You may pass only the function to curry. In that case, `curry()` will retrieve the arity from the function's
 * `length` property. However, a function's `length` property does not count a spread parameter, default parameters
 * nor any parameters following the first default parameter in the parameter list. This can lead to unexpected currying
 * results (even more so when composing a curried function with other functions). As a best practice, always pass an
 * explicit *arity*. Functionish provides the convenience functions `curry2()` and `curry3()`, which set the
 * appropriate arity for you.
 * 
 * The *func* argument may be a string representing a path to a module that resolves to a function. The string is first
 * passed to Node's `require()` function and the result is curried. Optionally, the module path may end with a `#`
 * followed by a key, in which case the key is first resolved against the loaded module object to obtain the function to
 * curry. See the example below.
 * 
 * To add in debugging, `curry()` preserves the name of the target function. On subsequent invocations of the curried
 * function itself, the returned function will also be tagged `bound`.
 * 
 * The returned function will have a method `partial(...args)` that partially applies the target function to the *args*.
 * See {@link module:partial partial()} for further details on partial application.
 * 
 * @example
 * 
 * const curry = require('functionish/curry');
 *
 * const sum = curry( 
 *     function sum(a,b) { 
 *         return (a+b)
 *     }
 * )
 * 
 * console.log(sum.name); // prints 'sum'
 * 
 * const increment = sum(1); // or: const increment = sum.partial(1)
 * console.log(increment.name); // prints 'bound sum' (or 'partial sum' if partial() was called)
 * 
 * increment(42); // returns 43
 *  
 * @example
 * 
 * const curry = require('functionish/curry');
 * 
 * // returns Node's `util.format()` method curried with binary arity
 * const curriedformat = curry(2, 'util#format');
 * 
 * // return the 'sum()' method on the object exported by the module located at './utils.js',
 * // curried with binary arity
 * const curriedsum = curry(2, './utils#sum'); 
 * 
 * // same as above, except it reads the arity from the 'sum()` method's 'length'-property.
 * const curriedsum = curry('./utils#sum');
 * 
 * @func curry
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry or a `require()`-like path to load the function from.
 * @returns {function}
 * @throws TypeError if *arity* is not a number or *func* could not be loaded or is not a function.
 */
module.exports = curry;

function curry(arity, func) {

    if( arguments.length === 1 ) [arity, func] = [ARITY_NONE, arity];

    if( typeof func !== 'function' ) func = resolvefunction(func);

    if( arity === ARITY_NONE ) arity = func.length;
    else if( typeof arity !== 'number' ) fail(ERR_BAD_ARITY, typeorclass(arity));

    const curriedfunction = {
        [func.name] : function (...args) {
            return (args.length < arity) ? curriedfunction.bind(null, ...args) : func(...args);
        }
    }[func.name];

    curriedfunction.partial = function (...args) { return partial(func, ...args) }

    return curriedfunction;
}

function resolvefunction(path) {

    const [targetpath, key] = String(path).split('#');

    // const func = (key === undefined) ? require(targetpath) : require(targetpath)?.[key];
    const func = loadmodule(targetpath, key);

    if( typeof func !== 'function' ) fail(ERR_BAD_FUNCTION, String(path), typeorclass(func));

    return func;
}

function loadmodule(path, key) {

    try {
        return (key === undefined) ? require(path) : require(path?.[key]);
    } catch (error) {

        if( error?.code === 'MODULE_NOT_FOUND' && path.startsWith('.') ) {

            const message = `It seem you are using curry to load a file module with a relative path. ` +
                            `Curry can only load file modules from abolute paths. ` +
                            `Prepend '__dirname' to the relative path and try again.`;

            error.message += ' ' + message;

        }

        throw error;
    }
}