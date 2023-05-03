/**
 * @module misc/nothrow
 */

'use strict';

const ERROR_NONE = undefined;
const VALUE_NONE = undefined;

function nothrow(func, ...args) {

    let error = ERROR_NONE;
    let value = VALUE_NONE;

    try {
        value = func.call(this, ...args);
    } catch(exception) {
        error = exception;
    }

    return { error, value }
}

module.exports = nothrow;