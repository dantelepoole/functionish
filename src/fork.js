/**
 * @module fork
 */

'use strict';

const THIS_NULL = null;

const applicable = require('./applicable');
const compose = require('./compose');

const runfork = (funcs, ...args) => funcs.map( applicable(...args) )

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(...targetfuncs) {
    
    const forkrunner = runfork.bind(THIS_NULL, targetfuncs);

    forkrunner.join = joinfunc => compose(joinfunc, forkrunner);

    return forkrunner;
}

module.exports = fork;