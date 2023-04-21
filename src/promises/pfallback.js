/**
 * @module promises/pfallback
 */

'use strict';

const isvoid = require('../types/isvoid');
const isempty = require('../types/isempty');

const fallbackrunner = (context, args) => func => func.call(context, ...args);

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
             : launchfallback( fallbackfuncs, fallbackrunner(this, args) );
    }
}

function launchfallback(fallbackfuncs, runfallback) {

    const onresolve = data => isvoid(data) ? _fallbacknext() : data;
    const onreject = _fallbacknext;

    return _fallbacknext();

    function _fallbacknext() {

        const nextfunc = fallbackfuncs.shift();

        return isempty(fallbackfuncs) 
             ? runfallback(nextfunc)
             : runfallback(nextfunc).then(onresolve, onreject);

    }
}

module.exports = pfallback;