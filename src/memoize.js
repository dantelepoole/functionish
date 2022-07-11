/**
 * @module memoize
 */

'use strict';

const CACHE_ENTRY_EMPTY = null;
const ERR_BAD_CACHEFUNC = `MemoizeError~The cache function has type %s. Expected a function.`;
const ERR_BAD_TARGETFUNC = `MemoizeError~The target function has type %s. Expected a function.`;

const fail = require('./fail');
const isvoid = require('./isvoid');
const typeorclass = require('./typeorclass');

module.exports = require('./curry2') (

    function memoize(cachefunc, targetfunc) {

        if( isvoid(cachefunc) ) cachefunc = cachefuncfactory();
        else if(typeof cachefunc !== 'function') fail(ERR_BAD_CACHEFUNC, typeorclass(cachefunc));

        if(typeof targetfunc !== 'function') fail(ERR_BAD_TARGETFUNC, typeorclass(targetfunc));

        const memoizename = `memoize ${targetfunc.name}`;

        const memoized = {

            [memoizename] : function (...args) {

                const cachedresult = cachefunc(args);

                if(cachedresult !== CACHE_ENTRY_EMPTY) return cachedresult.value;

                const result = targetfunc.apply(this, args);

                cachefunc(args, { value:result });

                return result;
            }

        } [memoizename];

        memoized.clearcache = function clearcache() { cachefunc(); }

        return memoized;
    }
)

function cachefuncfactory() {

    const cache = new Map();

    return function cachefunc(args, result) {

        if(arguments.length === 0) return cache.clear();

        const key = args.join(':');

        if(arguments.length === 1) return (cache.get(key) ?? CACHE_ENTRY_EMPTY);

        cache.set(key, result);

        return result;
    }
}