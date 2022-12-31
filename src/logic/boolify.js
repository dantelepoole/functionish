/**
 * @module logic/boolify
 */

'use strict';

const isfunction = require('../types/isfunction');
const loadfunction = require('../loadfunction');

/**
 * Coerce *func*'s return value to type boolean.
 * 
 * This function returns a function that passes its arguments *func* and returns either `true` or `false`
 * depending on whether *func* returns a truthy or falsy value respectively.
 * 
 * *func* may either be a function or the path to a package or module that exports a function.
 * 
 * @function boolify
 * @param {(function|string)} func The function to boolify
 * @returns {function}
 */
module.exports = function boolify(func) {

    isfunction(func) || (func = loadfunction(func));

    return (...args) => !! func(...args);
}