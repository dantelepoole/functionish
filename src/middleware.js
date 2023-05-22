/**
 * @module middleware
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `middleware()`</caption>
 * 
 * to do
 * 
 * @function middleware
 * @returns {any}
 */
function middleware(...transformers) {

    return function _middleware(sinkfunc, ...partialargs) {

        return function runmiddleware(...args) {

            let index = 0;
            const next = (...nextargs) => (index === transformers.length)
                                        ? sinkfunc.call(this, ...partialargs, ...nextargs)
                                        : transformers[index++].call(this, next, ...nextargs);
    
            return next(...args);
        }
    }
}

module.exports = middleware;