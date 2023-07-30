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

    const forked = partial(_forked, funcs);

    forked.join = joinfork.bind(funcs);

    return forked;
}

function joinfork(forkfuncs, joinfunc, ...partialargs) {

    return function _forkjoin(...args) {

        const forkresults = _forked.call(this, forkfuncs, ...args);

        return joinfunc.call(this, ...partialargs, ...forkresults);
    }

}

function _forked(funcs, ...args) {

    const results = new Array(funcs.length);

    for(let i = 0; i < funcs.length; i += 1) results[i] = funcs[i].call(this, ...args);

    return results;
}

module.exports = fork;