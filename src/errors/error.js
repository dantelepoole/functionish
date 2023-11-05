/**
 * @module errors/error
 */

const ERROR_NAME_GENERIC = 'Error';
const ERROR_NAME_RANGE = 'RangeError';
const ERROR_NAME_REFERENCE = 'ReferenceError';
const ERROR_NAME_TYPE = 'TypeError';

const THIS_NULL = null;

'use strict';

const compose = require('../compose');
const format = require('../misc/format');
const isfunction = require('../types/isfunction');

const errorctormap = Object.freeze({
    [ERROR_NAME_GENERIC]   : message => new Error(message), 
    [ERROR_NAME_RANGE]     : message => new RangeError(message),
    [ERROR_NAME_REFERENCE] : message => new ReferenceError(message),
    [ERROR_NAME_TYPE]      : message => new TypeError(message)
});

/**
 * to do
 * 
 * @example <caption>Example usage of `error()`</caption>
 * 
 * to do
 * 
 * @function error
 */
function error(errorname=ERROR_NAME_GENERIC, messageformat) {

    const errorctor = errorctormap[errorname] ?? customerrorctor.bind(THIS_NULL, errorname);
    const messageformatter = isfunction(messageformat) && messageformat
                              ||
                             format.bind(THIS_NULL, messageformat);

    return compose(errorctor, messageformatter);
}

function customerrorctor(errorname, errormessage) {

    const error = new Error(errormessage);

    error.name = String(errorname);

    return error;
}

error.Range = error.bind(THIS_NULL, ERROR_NAME_RANGE);
error.Reference = error.bind(THIS_NULL, ERROR_NAME_REFERENCE); 
error.Type = error.bind(THIS_NULL, ERROR_NAME_TYPE);

module.exports = error;