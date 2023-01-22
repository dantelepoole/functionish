/**
 * @module misc/getenv
 */

'use strict';

const environment = process.env;

/**
 * Return the value of the environment variable with the specified *name* or `undefined` if no
 * such environment variable has been set.
 * 
 * If *name* is `undefined`, returns an object containing all environment variables.
 * 
 * @example <caption>Example usage of `getenv()`</caption>
 * 
 * const { getenv } = require('functionish/misc');
 * 
 * getenv('SHELL'); // returns "/bin/bash" or whatever the value of the SHELL environment variable is on your machine
 * 
 * const env = getenv(); // returns an object containing all environment variables
 * env.SHELL; // "/bin/bash" or whatever the value of the SHELL environment variable is on your machine
 * 
 * @function getenv
 * @param {string} name The name of the environment variable
 * @returns 
 */
function getenv(name=undefined) {
    
    return (name === undefined)
         ? environment
         : environment[name];
}

module.exports = getenv;