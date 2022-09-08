/**
 * @module endswith
 */

'use strict';

const ERR_BAD_SOURCE = `EndsWithError~The source argument has type %s. Expected a string.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Function variant of {@link external:String.prototype.endsWith String.prototype.endsWith()}.
 * 
 * If *source* is not a string, an error is thrown.
 * 
 * `endswith()` is curried by default with binary arity.
 * 
 * @func endswith
 * @see {@link external:String.prototype.endsWith String.prototype.endsWith()}
 * @param {string} target The target string to check for
 * @param {string} source The source string to check
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function endswith(target, source) {
        return (typeof source === 'string') ? source.endsWith(target) : fail(ERR_BAD_SOURCE, typeorclass(source));
    }
)