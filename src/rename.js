/**
 * @module rename
 */

'use strict';

const callorcurry = require('../lib/callorcurry');
const curryarity = require('./curryarity');
const iscurried = require('./iscurried');

/**
 * Return a function with the specified *name* that passes its arguments to *func* and returns the result.
 * 
 * Despite the misleading name, `rename()` does not in fact change the value of *func*'s `name`-property. Instead,
 * it returns a new function with the specified *name* that simply forwards the call to *func*.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * renamed function will be curried with the same arity.
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

    const renamedfunc = { 
        [name](...args) { 
            return func(...args);
        }
    }[name];

    return iscurried(func) 
         ? callorcurry( curryarity(func), renamedfunc )
         : renamedfunc;
}

module.exports = rename;