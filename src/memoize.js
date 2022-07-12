/**
 * @module memoize
 */

'use strict';

const CACHE_NONE = null;
const ERR_BAD_CACHEFUNC = `MemoizeError~The cache function has type %s. Expected a function.`;
const ERR_BAD_TARGETFUNC = `MemoizeError~The target function has type %s. Expected a function.`;

const fail = require('./fail');
const isvoid = require('./isvoid');
const typeorclass = require('./typeorclass');

/**
 * Return a function that cache's *targetfunc*'s return values based on its argument list.
 * 
 * The returned function uses *cachefunc* for the caching operations. The *cachefunc* should comply with the following
 * conditions:
 * 1. If called without any arguments, *cachefunc* should clear its internal cache.
 * 2. If called with a single argument, it will be an array of the arguments pass to the *targetfunc*.
 * The *cachefunc* should return a cached result associated with those arguments or `null` if no such
 * result has been cached.
 * 3. If called with two arguments, the first will be an array of the arguments passed to the *targetfunc* and the
 * second will be the result that the *cachefunc* should associate with those arguments. Note that the result will not
 * be the actual return value of the *targetfunc*. Instead, it will be an object that holds *targetfunc*'s actual
 * return value as a property.
 * 
 * If *cachefunc* is `null` or `undefined`, `memoize()` will use its default cache function. The default cache function
 * is very simplistic and simply converts the arguments to strings to construct the key with which a return value is
 * cached. Therefore, the default cache function is appropriate for primitive type arguments only.If one or
 * more arguments have a non-primitive type, *the default cache function will produce incorrect
 * results*. Provide your own cache function to customize the caching for the types of arguments you expect your
 * function to receive. *Use the default cache function at your own risk.*
 * 
 * The returned function will have a `clearcache()` method that clears the internal cache of return values.
 * 
 * `memoize()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const memoize = require('functionish/memoize');
 * 
 * const loaduserdata = memoize(
 *     null, // use the default cache function (dangerous!)
 *     function loaduserdata(userid) {
 *         // retrieve data from the database
 *     }
 * )
 * 
 * loaduserdata(42); // retrieves the user data from the database
 * loaduserdata(42); // returns the cached user data
 * 
 * loaduserdata.clearcache(); // clear the cached data
 * 
 * @func memoize
 * @param {function} cachefunc A function that can cache *targetfunc*'s arguments and results
 * @param {function} targetfunc The target function to cache the arguments and results of
 * @return {function} The memoized function
 */
module.exports = require('./curry2') (

    function memoize(cachefunc, targetfunc) {

        if( isvoid(cachefunc) ) cachefunc = defaultcachefunc();
        else if(typeof cachefunc !== 'function') fail(ERR_BAD_CACHEFUNC, typeorclass(cachefunc));

        if(typeof targetfunc !== 'function') fail(ERR_BAD_TARGETFUNC, typeorclass(targetfunc));

        const memoizename = `memoize ${targetfunc.name}`;

        const memoized = {

            [memoizename] (...args) {

                const cachedresult = cachefunc(args);
                if(cachedresult !== CACHE_NONE) return cachedresult.value;

                const result = targetfunc.apply(this, args);
                cachefunc(args, { value:result });

                return result;
            }

        } [memoizename];

        memoized.clearcache = () => void( cachefunc() );

        return memoized;
    }
)

function defaultcachefunc() {

    const resultmap = new Map();

    return function cachefunc(args, result) {

        const argumentcount = arguments.length;

        return (argumentcount === 0) ? resultmap.clear()
             : (argumentcount === 1) ? (resultmap.get( args.join() ) ?? CACHE_NONE)
             : void( resultmap.set( args.join(), result ) );

    }
}