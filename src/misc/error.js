/**
 * @module misc/error
 */

'use strict';

const EMPTY_STRING = '';
const PAYLOAD_NONE = undefined;

const curry = require('../curry');

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
function error(name, message, payload=PAYLOAD_NONE) {
    
    const err = new Error( tostring(message) );

    if(name) err.name = tostring(name);
    if(payload !== PAYLOAD_NONE) err.payload = payload;

    return err;
}

module.exports = curry(1, error);