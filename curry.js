/**
 * @module curry
 */

'use strict';

const ARITY_NONE = Symbol();
const ERR_BAD_ARITY = "CurryError~The arity %s. Expected a positive integer.";

const fail = require('./fail');
const isnan = require('./isnan');
const notinteger = require('./notinteger');
const notnumber = require('./notnumber');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

const hassoleargument = args => (args.length === 1);
const isaritynone = arity => (arity === ARITY_NONE);
const islessthanone = x => (x < 1);
const notpositiveinteger = x => notinteger(x) || islessthanone(x);

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
 * If the path is not to a package but to a file module, it must be an absolute path. `curry()` cannot handle relative
 * paths. To load file modules from relative paths, prepend `__dirname` to the relative path before calling `curry()`. 
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
 * const increment = sum(1); // or: const increment = sum.partial(1)
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
 * const curriedsum = curry(2, __dirname + '/utils#sum'); 
 * 
 * // same as above, except it reads the arity from the 'sum()` method's 'length'-property.
 * const curriedsum = curry(__dirname + '/utils#sum');
 * 
 * @func curry
 * @see {@link module:curry2 curry2()}
 * @see {@link module:curry3 curry3()}
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry or a `require()`-like path to load the function from.
 * @returns {function}
 * @throws TypeError if *arity* is not a number or *func* could not be loaded or is not a function.
 */
module.exports = function curry(arity, func) {

    hassoleargument(arguments) && ([arity, func] = [ARITY_NONE, arity]);

    func = resolvefunction(func);

    isaritynone(arity) ? (arity = func.length) : notpositiveinteger(arity) && failbadarity(arity);

    return curryfunction(arity, func);
}

function failbadarity(arity) {

    isnan(arity) ? fail(ERR_BAD_ARITY, 'is NaN')
    : notnumber(arity) ? fail(ERR_BAD_ARITY, `has type ${ typeorclass(arity) }`)
    : fail(ERR_BAD_ARITY, `is ${arity}`);
}

function curryfunction(arity, func, boundargs=[]) {

    return function curriedfunction(...args) {

        const curriedargs = [...boundargs, ...args];

        return (curriedargs.length >= arity) ? func.call(this, ...curriedargs)
             : curryfunction(arity, func, curriedargs);
    }
}