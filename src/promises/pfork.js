/**
 * @module promises/pfallback
 */

'use strict';

const isvoid = require('../types/isvoid');
const isempty = require('../types/isempty');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `pfallback()`</caption>
 * 
 * [to do]
 * 
 */
function pfallback(...funcs) {

    return function _pfallback(...args) {

        return isempty(funcs)
             ? Promise.resolve( args[0] )
             : launchfallback(fallbackfuncs, context, args);
    }
}

function launchfallback(fallbackfuncs, context, args) {

    const onresolve = data => isvoid(data) ? _fallbacknext() : data;
    const onreject = _fallbacknext;

    return _fallbacknext();

    function _fallbacknext() {

        const nextfunc = fallbackfuncs.shift();

        return isempty(fallbackfuncs) 
             ? nextfunc.call(context, ...args)
             : nextfunc.call(context, ...args).then(onresolve, onreject);

    }
}

module.exports = pfallback;