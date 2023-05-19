/**
 * @module misc/error
 */

'use strict';

const EMPTY_STRING = '';
const NAME_DEFAULT = 'Error';

const curry = require('../curry');
const format = require('./format');

const tostring = str => String(str ?? EMPTY_STRING);

/**
 * to do
 * 
 * @example <caption>Example usage of `error()`</caption>
 * 
 * to do
 * 
 * @function error
 */
function error(name=NAME_DEFAULT, message, ...messageargs) {
    
    const formattedmessage = format(message, ...messageargs);
    const err = new Error(formattedmessage);

    (name === NAME_DEFAULT) || (err.name = tostring(name));

    return err;
}

module.exports = curry(1, error);