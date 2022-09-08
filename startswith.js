/**
 * @module startswith
 */

'use strict';

const ERR_BAD_SOURCE = `StartsWithError~The source argument has type %s. Expected a string.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Function variant of {@link external:String.prototype.startsWith String.prototype.startsWith()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * `startswith()` is curried by default with binary arity.
 * 
 * @func startswith
 * @see {@link external:String.prototype.startsWith String.prototype.startsWith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function startswith(target, source) {
        return (typeof source === 'string') ? source.startsWith(target) : fail(ERR_BAD_SOURCE, typeorclass(source));
    }
)