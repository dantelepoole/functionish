/**
 * @module tap
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('./resolvefunction');

module.exports = function tap(func, ...partialargs) {

    isfunction(func) || (func = resolvefunction(func));

    return (...args) => (func(...partialargs, ...args), args[0]);
}