/**
 * @module wrap
 */

'use strict';

const curry = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * to do
 * 
 * @function wrap
 * @param {function} wrapperfunc The function to wrap *func* with
 * @param {function} func The function to wrap
 * @returns {function}
 */
function wrap(wrapperfunc, func, ...partialargs) {

    if( isarray(wrapperfunc) ) return _wrapmany.bind(null, wrapperfunc, func, ...partialargs);

    return function _wrap(...args) {
        return wrapperfunc(func, ...partialargs, ...args);
    }
}

function _wrapmany(wrapfuncs, targetfunc, ...args) {

    let index = 0;
    const next = (...nextargs) => (index === wrapfuncs.length)
                                ? targetfunc.call(this, ...partialargs, ...nextargs)
                                : wrapfuncs[index++].call(this, next, ...nextargs);

    return next(...args);
}

module.exports = curry(1, wrap);
