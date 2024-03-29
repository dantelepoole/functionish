/**
 * @module memoize
 */

'use strict';

const CACHE_NONE = null;

const curry = require('./curry');
const isvoid = require('./types/isvoid');

/**
 * Return a function that cache's *targetfunc*'s return values based on its argument list.
 * 
 * The returned function uses *cachefunc* for the caching operations. The *cachefunc* should comply with the following
 * conditions:
 * 1. If called with a single argument, it will be an array of the arguments pass to the *targetfunc*.
 * The *cachefunc* should return a cached result associated with those arguments or `null` if no such
 * result has been cached.
 * 2. If called with two arguments, the first will be an array of the arguments passed to the *targetfunc* and the
 * second will be the result that the *cachefunc* should associate with those arguments. Note that the result will not
 * be the actual return value of the *targetfunc*. Instead, it will be an object that holds *targetfunc*'s actual
 * return value as a property.
 * 
 * If *cachefunction* is `null` or `undefined`, `memoize()` will use its default cache function. The default cache function
 * is very simplistic and simply converts the arguments to strings to construct the key with which a return value is
 * cached. Therefore, the default cache function is appropriate for primitive type arguments only.If one or
 * more arguments have a non-primitive type, *the default cache function will produce incorrect
 * results*. Provide your own cache function to customize the caching for the types of arguments you expect your
 * function to receive.
 * 
 * `memoize()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of memoize()</caption>
 * 
 * const { memoize } = require('functionish');
 * 
 * const loaduserdata = memoize(
 *     null, // use default cache function
 *     function loaduserdata(userid) {
 *         // retrieve data from the database
 *     }
 * )
 * 
 * loaduserdata(42); // retrieves the user data from the database
 * loaduserdata(42); // returns the cached user data
 * 
 * @function memoize
 * @param {function} cachefunc A function that can cache *targetfunc*'s arguments and results
 * @param {function} targetfunc The target function to cache the arguments and results of
 * @return {function} The memoized function
 */
function memoize(cachefunc, targetfunc) {

    if( isvoid(cachefunc) ) cachefunc = defaultcachefunc();
    
    return function _memoizedfunction(...args) {

        const cachedresult = cachefunc(args);
        if(cachedresult !== CACHE_NONE) return cachedresult.value;

        const result = targetfunc.call(this, ...args);
        
        cachefunc(args, { value:result });

        return result;
    }
}

function defaultcachefunc() {

    const resultmap = new Map();

    return function cachefunc(args, result) {

        const cachekey = args.join();

        if(arguments.length === 1) return (resultmap.get(cachekey) ?? CACHE_NONE);

        resultmap.set(cachekey, result);
    }
}

module.exports = curry(1, memoize);