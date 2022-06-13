/**
 * @module raise
 */

'use strict';

const format = require('util').format;

const INDEX_NOT_FOUND = -1;
const NAME_NONE = undefined;
const NAME_SEPARATOR = '~';

module.exports = raise;

/**
 * Throw an error with a `printf()`-formatted message. The *formatmsg* is formatted with *formatargs* (using Node's 
 * `util.format()` method)to produce the error message.
 * 
 * If *formatmsg* contains a `~` character, the portion of *formatmsg* preceding the `~` is used to set the error's
 * `name` property. The portion following the `~` is used for the error message.
 * 
 * @example
 * 
 * const raise = require('functionish/raise');
 * 
 * raise('FortyTwoError~The value %s is not 42', 'foobar');
 * // Throws an error with the name 'FortyTwoError' and the message: "The value foobar is not 42"
 * 
 * @param {string} formatmsg 
 * @param  {...any} formatargs 
 * @throws Always throws an error
 */
function raise(formatmsg, ...formatargs) {

    const [name, message] = parseformatmsg(formatmsg);
    const errormessage = format(message, ...formatargs);
    const error = new Error(errormessage);

    if( name !== NAME_NONE ) error.name = name;

    throw error;
}

function parseformatmsg(formatmsg) {

    formatmsg = String(formatmsg);

    const index = formatmsg.indexOf(NAME_SEPARATOR);

    return (index === INDEX_NOT_FOUND) ? [NAME_NONE, formatmsg] : [formatmsg.slice(0, index), formatmsg.slice(index+1)];
}