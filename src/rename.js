/**
 * @module rename
 */

'use strict';

/**
 * Return a function with the specified *name* that passes its arguments to *func* and returns the result.
 * 
 * @func rename
 * @param {string} name The name of the returned function.
 * @param {function} func The target function.
 * @returns {function}
 */
module.exports = function rename(name, func) {

    name = String(name);

    return { 
        [name](...args) { 
            return func.call(this, ...args);
        }
    }[name];
}