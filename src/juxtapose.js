/**
 * @module juxtapose
 */

'use strict';

const applicable = require('./applicable');

/**
 * Return an array containing the results of passing the *args* to each function in *funcs*.
 * 
 * @func juxtapose
 * @param {function[]} funcs The functions to invoke
 * @param {any[]} args The arguments to pass to each function.
 * @returns {any[]}
 */
module.exports = function juxtapose(...funcs) {
    return (...args) => funcs.map( applicable(...args) );
}
