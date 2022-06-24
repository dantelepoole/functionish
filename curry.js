/**
 * @module curry
 */

'use strict';

const fail = require('./fail');
const typeorclass = require('./typeorclass');

const ARITY_NONE = undefined;
const ERR_BAD_ARITY = "TypeError~curry(): the arity has type %s. Expected a number.";
const ERR_BAD_FUNCTION = "TypeError~curry(): the value at '%s' has type %s. Expected a function.";

/**
 * Return a curried variant of the *func* function that curries at least *arity* arguments before applying *func* and
 * returning the result.
 * 
 * The *func* argument may be a string representing a path to a module that resolves to a function. The string is first
 * passed to Node's `require()` function and the result is curried. Optionally, the module path may end with a `#`
 * followed by a key, in which case the key is first resolved against the loaded module object to obtain the function to
 * curry. See the example below.
 * 
 * You may pass only a single argument containing the function (or module path) to curry. In that case, `curry()` will
 * retrieve the arity from the function's `length` property. However, a function's `length` property does not count a
 * spread parameter, default parameters nor any parameters following the first default parameter in the parameter list.
 * This can lead to unexpected currying results (even more so when composing a curried function with other functions).
 * 
 * Providing an explicit arity can help avoid these difficulties. Consider it a best practice to always provide an
 * explicity *arity*, regardless of the function you are currying. Functionish provides the convenience
 * functions `curry2()` and `curry3()`, which set the appropriate arity for you.
 * 
 * If you bind the curried function to a custom `this`-object, it will be propagated to the target function.
 * 
 * @example
 * 
 * const curry = require('functionish/curry');
 *
 * const sum = curry( 2, (a,b)=>(a+b) ); // optionally: curry( (a,b)=>(a+b) )
 * 
 * const increment = sum(1);
 * const decrement = sum(-1);
 * 
 * increment(42); // returns 43
 * decrement(42); // returns 41
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

    return function curriedfunction(...args) {
        return (args.length < arity) ? curriedfunction.bind(null,...args) : func(...args);
    }
}

function resolvefunction(path) {

    const [targetpath, key] = String(path).split('#');

    const func = (key === undefined) ? require(targetpath) : require(targetpath)?.[key];

    if( typeof func !== 'function' ) fail(ERR_BAD_FUNCTION, String(path), typeorclass(func));

    return func;
}