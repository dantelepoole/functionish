/**
 * @module promises/pfallback
 */

'use strict';

const CONTEXT_NONE = undefined;

const trynext = (funcs, args) => (funcs.length === 0)
                               ? Promise.resolve( args[0] )
                               : funcs.shift().call(CONTEXT_NONE, ...args).catch( () => trynext(funcs, args) );

function pfallback(...funcs) {
    
    const _pfallback = (...args) => trynext( funcs.slice(), args );

    return _pfallback;
}

module.exports = pfallback;