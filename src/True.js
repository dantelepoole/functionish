/**
 * @module True
 */

'use strict';

const isfunction = require('./types/isfunction');

/** 
 * to do
 * 
 * @example <caption>Example usage of `True()`</caption>
 * 
 * to do
 * 
 * @function True
 * @returns {function}
 */
function True(expression, ...args) {

    isfunction(expression) && expression(...args);

    return true;
}

module.exports = True;