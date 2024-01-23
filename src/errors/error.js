/**
 * @module errors/error
 */
'use strict';

const compose = require('../compose');
const formatter = require('../misc/formatter');

const errorctormap = Object.freeze({
    ['Error']          : message => new Error(message), 
    ['RangeError']     : message => new RangeError(message),
    ['ReferenceError'] : message => new ReferenceError(message),
    ['TypeError']      : message => new TypeError(message)
});

const geterrorctor = errorname => errorctormap[errorname] ?? customerrorctor.bind(null, errorname);

/**
 * Return a function that creates an Error-instance with the specified *errorname* (default: 'Error'). The 
 * errormessage is formatted using the *messageformat* and the returned function's arguments.
 * 
 * One or more *processor* functions can be passed, each which will called with the corresponding argument passed to
 * the returned function. If any *processor* is <abbr title="null or undefined">void</abbr>, the corresponding argument
 * will pass through unchanged, as are any surplus argument without corresponding *processor* functions.
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
 * @example <caption>Example usage of `error()` with processors</caption>
 * 
 * const { error } require('functionish/errors');
 * 
 * const messageformat = `User %d has insufficient permission: '%s'.`;
 * const getuserid = user => user.id;
 * const getpermission => session => session.getpermission();
 * const buildpermissionerror = error('PermissionError', messageformat, getuser, getpermission);
 * 
 * throw buildpermissionerror(user, session);
 * // throws an Error called `PermissionError` with the message: "User 42 has insufficient permission 'read'."
 * 
 * @function error
 * @see {@link external:util.format util.format()}
 * @param {string} [errorname='Error'] The name of the errors to build
 * @param {string} messageformat The format of the errormessage
 * @param {...function[]} processors One or more functions to preprocess individual arguments 
 * @returns {Error}
 */
function error(errorname='Error', messageformat, ...processors) {
    return compose( geterrorctor(errorname), formatter(messageformat, ...processors) );
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