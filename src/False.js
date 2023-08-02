/**
 * @module False
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * to do
 * 
 * @example <caption>Example usage of `False()`</caption>
 * 
 * to do
 * 
 * @function False
 * @returns {function}
 */
function False(expression, ...args) {

    isfunction(expression) && expression.call(this, ...args);

    return false;
}

module.exports = False;