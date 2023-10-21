/**
 * @module fork
 */

'use strict';

const applicable = require('./applicable');
const compose = require('./compose');
const partial = require('./partial');

const runfork = (funcs, args) => funcs.map( applicable(...args) );
const buildfork = funcs => compose(funcs.map.bind(funcs), applicable);
const buildforkjoin = (funcs, joinfunc) => (...forkargs) => joinfunc( ...runfork(funcs, forkargs) );
const prepareforkjoin = funcs => (joinfunc, ...partialargs) => buildforkjoin(funcs, partial(joinfunc, ...partialargs));

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

    _forked.join = prepareforkjoin(funcs);

    return _forked;
}

module.exports = fork;