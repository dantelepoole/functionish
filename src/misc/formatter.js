/**
 * @module misc/format
 */

'use strict';

const format = require('util').format;

/**
 * Return a function that passes its arguments to their corresponding *argumenthandlers* and returns a string formatted
 * with the *formatstring*. If an argument has no corresponding *argumenthandler*, its value is used instead.
 * 
 * @example <caption>Example usage of `formatter()`</caption>
 * 
 * const { formatter } = require('functionish/misc');
 * 
 * const user = { name:'Douglas Adams' }
 * const getusername = user => user.name;
 * const welcomemessage = formatter('Welcome, %s. Your user-id is %d', getusername);
 * 
 * welcomemessage(user, 42); // returns "Welcome, Douglas Adams. Your user-id is 42."
 * 
 * @function formatter
 * @see {@link externel:util.format format()}
 * @param {string} formatstring A printf-like format string
 * @param {...function[]} argumenthandlers The optional argumenthandlers
 * @returns {string}
 */
function formatter(formatstring, ...argumenthandlers) {

    formatstring = String(formatstring);

    return function _formatter(...args) {

        for(let i = 0; i < argumenthandlers.length; i += 1) args[i] = argumenthandlers[i]( args[i] );

        return format(formatstring, ...args);
    }   

}

module.exports = formatter;