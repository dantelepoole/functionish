/**
 * @module tryfinally
 */

'use strict';

const NOT_RESOLVED = Symbol.for('functionish/tryfinally/#NOT_RESOLVED');

const curry = require('./curry');
const isfunction = require('./types/isfunction');
const raise = require('./misc/raise');

/**
 * to do
 * 
 * @example <caption>Example usage of `tryfinally()`</caption>
 * 
 * to do
 * 
 * @function tryfinally
 * @param {function} onfinally to do
 * @param {function} func The function to run
 * @returns {any}
 */
function tryfinally(onfinally, func, ...partialargs) {

    validatefunction(func);

    return function _tryfinally(...args) {

        let resolvedresult = NOT_RESOLVED;
        const resolve = value => (resolvedresult = value);
        
        const [data, iserror] = runsafe(this, func, ...partialargs, ...args);

        onfinally.call(this, data, iserror, resolve);

        return (resolvedresult !== NOT_RESOLVED) ? resolvedresult
             : iserror ? raise(data)
             : data;
    }
}

function runsafe(thiscontext, func, ...args) {

    try {
        const data = func.call(thiscontext, ...args);
        return [data, false];
    } catch(error) {
        return [error, true];
    }
}

function validatefunction(func) {

    if( isfunction(func) ) return func;

    const errormessage = `tryfinally(): The function has type ${typeof func}. Expected a function.`;
    throw new TypeError(errormessage);
}

module.exports = curry(2, tryfinally);