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
function Void(expression, ...args) {
    isfunction(expression) && expression.call(this, ...args);
}

module.exports = Void;