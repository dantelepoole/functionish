/**
 * @module misc/error
 */

'use strict';

const curry = require('../curry');
const format = require('../misc/format');
const isstring = require('../types/isstring') 

/**
 * to do
 * 
 * @example <caption>Example usage of `error()`</caption>
 * 
 * to do
 * 
 * @function error
 */
function error(errorname, messageformat, ...messageargs) {
    
    const errormessage = (messageargs.length > 0)
                       ? format(messageformat, ...messageargs)
                       : messageformat;

    const errorinstance = new Error(errormessage);

    isstring(errorname) && (errorinstance.name = errorname);

    return errorinstance;
}

module.exports = curry(1, error);