/**
 * @module fork
 */

'use strict';

const applicable = require('./applicable');
const compose = require('./compose');
const curry1 = require('./curry1');
const isfunction = require('./types/isfunction');

const runfork = curry1(
    (funcs, ...args) => funcs.map( applicable(...args) )
);

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(joinfunc, ...funcs) {

    return isfunction(joinfunc)
         ? compose( joinfunc, runfork(funcs) )
         : runfork(funcs);
}

module.exports = fork;