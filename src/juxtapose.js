/**
 * @module juxtapose
 */

'use strict';

const applicable = require('./applicable');

/**
 * Return an array containing the results of passing the *args* to each function in *funcs*.
 * 
 * @example <caption>Example usage of juxtapose()</caption>
 * 
 * const { juxtapose } = require('functionish');
 * 
 * const add = (a,b) => (a+b)
 * const multiply = (a,b) => (a*b);
 * const power = (exponent, base) => Math.pow(base, exponent);
 * 
 * const allops = juxtapose(add, multiply, power);
 * 
 * allops(2,3); // returns [5, 6, 8];
 * 
 * @function juxtapose
 * @param {function[]} funcs The functions to invoke
 * @param {any[]} args The arguments to pass to each function.
 * @returns {any[]}
 */
function juxtapose(...funcs) {
    return (...args) => funcs.map( applicable(...args) );
}

module.exports = juxtapose;
