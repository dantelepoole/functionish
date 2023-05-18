/**
 * @module Void
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * to do
 * 
 * @example <caption>Example usage of `Void()`</caption>
 * 
 * to do
 * 
 * @function Void
 * @returns {function}
 */
function Void(func, ...args) {
    isfunction(func) && func.call(this, ...args);
}

Void.for = function _Void_for(func, ...partialargs) {

    return function _Void(...args) {
        func.call(this, ...partialargs, ...args);
    }
}

module.exports = Void;