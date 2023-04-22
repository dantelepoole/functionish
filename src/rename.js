/**
 * @module rename
 */

'use strict';

/**
 * Return a function with the specified *name* that passes its arguments to *func* and returns the result.
 * 
 * Despite the misleading name, `rename()` does not in fact change the value of *func*'s `name`-property. Instead,
 * it returns a new function with the specified *name* that simply forwards the call to *func*.
 * 
 * @example <caption>Example usage of `rename()`</caption>
 * 
 * const { rename } = require('functionish');
 * 
 * function add(a,b) { return (a+b); }
 * 
 * const sum = rename('sum', add);
 * 
 * sum.name; // 'sum'
 * 
 * @function rename
 * @param {string} name The name of the returned function.
 * @param {function} func The target function.
 * @returns {function}
 */
function rename(name, func) {

    name = String(name);

    return { 
        [name](...args) { 
            return func.call(this, ...args);
        }
    }[name];

}

module.exports = rename;