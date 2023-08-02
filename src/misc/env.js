/**
 * @module misc/env
 */

'use strict';

const environment = process.env;

/**
 * Return the value of the environment variable with the specified *varname* or `undefined` if no
 * such environment variable has been set.
 * 
 * If called without arguments, returns an object containing all environment variables.
 * 
 * @example <caption>Example usage of `env()`</caption>
 * 
 * const { env } = require('functionish/misc');
 * 
 * env('SHELL'); // returns "/bin/bash" or whatever the value of the SHELL environment variable is on your machine
 * 
 * const environment = env(); // returns an object containing all environment variables
 * environment.SHELL; // "/bin/bash" or whatever the value of the SHELL environment variable is on your machine
 * 
 * @function env
 * @param {string} varname The name of the environment variable to return
 * @returns {string|object}
 */
function env(varname) {
    
    return (arguments.length === 0)
         ? environment
         : environment[varname];
}

module.exports = env;