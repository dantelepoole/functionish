/**
 * @module misc/fail
 */

'use strict';

const format = require('util').format;

const INDEX_NOT_FOUND = -1;
const NAME_NONE = undefined;
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
 * const fail = require('functionish/misc');
 * 
 * // Throw an error with the name 'FortyTwoError' and the message: "The value foobar is not 42"
 * fail('FortyTwoError~The value %s is not 42', 'foobar');
 * 
 * @function fail
 * @param {string} formatmsg The formatted error message
 * @param  {...any} formatargs The arguments to *formatmsg*
 * @throws {any}
 */
function fail(formatmsg, ...formatargs) {

    const formattedmessage = format(formatmsg, ...formatargs);
    const [name, message] = parseformatmsg(formattedmessage);

    const error = new Error(message);

    if(name !== NAME_NONE) error.name = name;

    throw error;
}

function parseformatmsg(formatmsg) {

    const index = formatmsg.indexOf(NAME_SEPARATOR);

    return (index === INDEX_NOT_FOUND)
         ? [NAME_NONE, formatmsg]
         : [formatmsg.slice(0, index), formatmsg.slice(index+1)];
}

module.exports = fail;