/**
 * @module renamefunction
 */

'use strict';

const ERR_BAD_NAME = `RenameFunctionError~The name has type %s. Expected a string.`;
const ERR_BAD_FUNC = `RenameFunctionError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const notfunction = require('./notfunction');
const notstring = require('./notstring');
const typeorclass = require('./typeorclass');

/**
 * Return a function with the specified *name* that passes its arguments to *func* and returns the result.
 * 
 * @func renamefunction
 * @param {string} name The name of the returned function.
 * @param {function} func The target function.
 * @returns {function}
 */
module.exports = function renamefunction(name, func) {

    return notstring(name) ? fail(ERR_BAD_NAME, typeorclass(name))
         : notfunction(func) ? fail(ERR_BAD_FUNC, typeorclass(func))
         : { [name](...args) { return func.call(this, ...args) } }[name];
}