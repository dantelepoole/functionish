/**
 * @module boolify
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('./resolvefunction');

module.exports = function boolify(func) {

    isfunction(func) || (func = resolvefunction(func));

    return (...args) => !! func(...args);
}