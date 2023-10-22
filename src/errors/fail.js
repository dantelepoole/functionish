/**
 * @module errors/fail
 */

'use strict';

const format = require('util').format;
const isstring = require('../types/isstring');

const INDEX_NOT_FOUND = -1;
const NAME_SEPARATOR = '~';

/**
 * Throw an error with a `printf()`-formatted message. The *formatmsg* is formatted with *formatargs* (using Node's 
 * `util.format()` method)to produce the error message.
 * 
 * If *formatmsg* contains a `~` character, the portion of *formatmsg* preceding the `~` is used to set the error's
 * `name` property. The portion following the `~` is used for the error message.
 * 
 * @example <caption>Example usage of `fail()`</caption>
 * 
 * const fail = require('functionish/errors');
 * 
 * // Throw an error with the name 'FortyTwoError' and the message: "The value foobar is not 42"
 * fail('FortyTwoError~The value %s is not 42', 'foobar');
 * 
 * @function fail
 * @param {string} messageformat The formatted error message
 * @param  {...any} messageargs The arguments to *formatmsg*
 * @throws {any}
 */
function fail(messageformat, ...messageargs) {

    const formattedmessage = format(messageformat, ...messageargs);

    const {name, message} = parsemessage(formattedmessage);

    const error = new Error(message);

    isstring(name) && (error.name = name);

    throw error;
}

function parsemessage(message) {

    const index = message.indexOf(NAME_SEPARATOR);

    return (index === INDEX_NOT_FOUND)
         ? { message }
         : { errorname:message.slice(0, index), message:message.slice(index + 1) }

}

module.exports = fail;