/**
 * @module nothrow
 */

'use strict';

function nothrow(func, ...args) {

    try {
        return { value:func.call(this, ...partialargs, ...args) }
    } catch(error) {
        return { error };
    }
}

module.exports = nothrow;