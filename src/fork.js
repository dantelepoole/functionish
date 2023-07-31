/**
 * @module fork
 */

'use strict';

const partial = require('./partial');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(...funcs) {

    function _forked(...args) {
        return _runfork.call(this, funcs, args);
    }

    _forked.join = joinfork.bind(funcs);

    return _forked;
}

function joinfork(forkfuncs, joinfunc, ...partialargs) {

    return function _runforkjoin(...args) {

        const forkresults = _runfork.call(this, forkfuncs, args);

        return joinfunc.call(this, ...partialargs, ...forkresults);
    }

}

function _runfork(funcs, args) {

    const results = new Array(funcs.length);

    for(let i = 0; i < funcs.length; i += 1) results[i] = funcs[i].call(this, ...args);

    return results;
}

module.exports = fork;