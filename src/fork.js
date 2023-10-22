/**
 * @module fork
 */

'use strict';

const THIS_NULL = null;

const applicable = require('./applicable');
const compose = require('./compose');
const isfunction = require('./types/isfunction');

const runfork = (funcs, ...args) => funcs.map( applicable(...args) )

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(joinfunc, ...funcs) {

    const forkrunner = runfork.bind(THIS_NULL, funcs);

    return isfunction(joinfunc)
         ? compose(joinfunc, forkrunner)
         : forkrunner;
}

module.exports = fork;