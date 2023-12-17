/**
 * @module errors/error
 */
'use strict';

const compose = require('../compose');
const curry1 = require('../curry1');
const format = require('../misc/format');
const isfunction = require('../types/isfunction');
const isvoid = require('../types/isvoid');

const errorctormap = Object.freeze({
    ['Error']          : message => new Error(message), 
    ['RangeError']     : message => new RangeError(message),
    ['ReferenceError'] : message => new ReferenceError(message),
    ['TypeError']      : message => new TypeError(message)
});

/**
 * Return a function that creates an Error-instance with the specified *errorname* (default: 'Error'). The 
 * errormessage is formatted using the *messageformat* and the returned function's arguments.
 * 
 * If the *messageformat* is a function instead of a string, the messageformat function is called with the arguments
 * passed to the returned function and its return value is used as the errormessage.
 * 
 * `error()` has three methods names `error.Range`, `error.Reference` and `error.Type` that return functions to build
 * Error-instances with the names 'RangeError', 'ReferenceError' and 'TypeError' respectively.
 * 
 * Note that the Error-instances returned are always instances of Javascript's native `Error` object type. Only the
 * object's `name` is updated with the *errorname*.
 * 
 * @example <caption>Example usage of `error()`</caption>
 * 
 * const { error } = require('functionish/errors');
 * 
 * const buildargumenterror = error('ArgumentError', 'The type of the argument %s is invalid.' );
 * 
 * throw buildargumenterror('username'); // throws an Error called `ArgumentError` and with the message:
 *                                       // "The type of the argument username is invalid."
 * 
 * @example <caption>Example usage of `error()` with a function messageformat</caption>
 * 
 * const { error } require('functionish/errors');
 * 
 * const messageformatter = (...args) => `The arguments ${ args.join() } are invalid.`;
 * const buildargumenterror = error('ArgumentError', messageformatter);
 * 
 * throw buildargumenterror('username', 'userid', 'useraddress');
 * // throws an Error called `ArgumentError` and with the message: "The arguments username,userid,useraddress are invalid."
 * 
 * @function error
 * @see {@link external:util.format util.format()}
 * @param {string|function} [errorname='Error'] The name of the errors to build
 * @param {string} messageformat The format of the errormessage
 * @returns {Error}
 */
function error(errorname='Error', messageformat) {

    const errorctor = errorctormap[errorname] ?? customerrorctor.bind(null, errorname);
    const messageformatter = isfunction(messageformat)
                           ? messageformat
                           : format.bind(null, messageformat);

    return compose(errorctor, messageformatter);
}

function customerrorctor(errorname, errormessage) {

    const error = new Error(errormessage);

    error.name = String(errorname);

    return error;
}

error.Range = error.bind(null, 'RangeError');
error.Reference = error.bind(null, 'ReferenceError'); 
error.Type = error.bind(null, 'TypeError');

module.exports = error;