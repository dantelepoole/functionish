/**
 * @module split
 */

'use strict';

const ERR_BAD_SOURCE = `SplitError~The source has type %s. Expected a string.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Function variant of {@link external:String.prototype.split String.prototype.split()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * `split()` is curried by default with binary arity.
 * 
 * @func split
 * @see {@link external:String.prototype.split String.prototype.split()}
 * @param {string} separator The delimiter string
 * @param {string} source The string to split
 * @returns {string[]}
 */
module.exports = require('./curry2')(

    function split(separator, source) {
        return (typeof source === 'string') ? source.split(separator) : fail(ERR_BAD_SOURCE, typeorclass(source));
    }
)