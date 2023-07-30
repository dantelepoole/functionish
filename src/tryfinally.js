/**
 * @module tryfinally
 */

'use strict';

const ERROR_NULL = null;
const NOT_RESOLVED = Symbol.for('functionish/tryfinally/#NOT_RESOLVED');

const curry = require('./curry');
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

module.exports = curry(2, tryfinally);