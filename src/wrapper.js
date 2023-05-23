/**
 * @module wrapper
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `wrapper()`</caption>
 * 
 * to do
 * 
 * @function wrapper
 * @returns {any}
 */
function wrapper(...wrapfuncs) {

    return function _wrapper(sinkfunc, ...args) {

        let index = 0;
        const next = (...nextargs) => (index === wrapfuncs.length)
                                    ? sinkfunc.call(this, ...partialargs, ...nextargs)
                                    : wrapfuncs[index++].call(this, next, ...nextargs);

        return next(...args);
    }
}

module.exports = wrapper;