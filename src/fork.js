/**
 * @module fork
 */

'use strict';

const THIS_NULL = null;

const applicable = require('./applicable');
const isempty = require('./misc/isempty');
const partial = require('./partial');

const runfork = (funcs, args) => funcs.map( applicable(...args) );

const buildfork = funcs => (...args) => runfork(funcs, args);
const buildforkjoin = (funcs, joinfunc) => (...forkargs) => joinfunc( ...runfork(funcs, forkargs) );
const initforkjoin = funcs => (joinfunc, ...partialargs) => isempty(partialargs)
                                                          ? buildforkjoin(funcs, joinfunc)
                                                          : buildforkjoin(funcs, partial(joinfunc, ...partialargs));

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(...funcs) {

    const _forked = buildfork(funcs);

    _forked.join = initforkjoin(funcs);

    return _forked;
}

module.exports = fork;