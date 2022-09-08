/**
 * @module resolvefunction
 */

'use strict';

const DOT = '.';
const ERR_BAD_FUNCTION = "ResolveFunctionError~The path '%s' resolved to a value with type %s. Expected a function.";
const ERRORCODE_MODULE_NOT_FOUND = 'MODULE_NOT_FOUND';
const HASHMARK = '#';

const fail = require('./fail');
const isfunction = require('./isfunction');
const split = require('./split');
const startswith = require('./startswith');
const typeorclass = require('./typeorclass');

const isrelative = startswith(DOT);
const tokenize = split(HASHMARK);

/**
 * If *path* is a function, return it. Otherwise, attempt to load the module or package specified by *path* and return
 * its exported function. If its exported value is not a function, an error is thrown.
 * 
 * Optionally, the *path* may be followed by a hash (`#`) and a property name, in which case the target function is
 * looked up on the exported object by the property name.
 * 
 * Important: resolvefunction() only accepts absolute paths to file modules. To pass a path that is relative to the
 * current module, prepend the path with `__dirname`.
 * 
 * @example
 * 
 * const resolvefunction = require('functionish/resolvefunction');
 * 
 * function applyfunc(pathtofunc, ...args) {
 *      
 *    const func = resolvefunction(pathtofunc);
 *    return func.apply(null, args);
 * }
 * 
 * const highestnumber = applyfunc('Math#random', 1,2,3,42); // returns 42
 * applyfunc(__dirname + '/utils#somemethod'); // runs the somemethod() method of the utils-module
 *                                             // in the 'utils'-subdirectory below the directory of the
 *                                             // current module1
 * 
 * @param {(string|function)} path The function or file path of the function to return
 * @returns {function}
 */
module.exports = function resolvefunction(path) {

    if( isfunction(path) ) return path;

    const [modulepath, key] = tokenize(path);
    const targetfunction = loadfunction(modulepath, key);

    return isfunction(targetfunction) ? targetfunction
         : fail(ERR_BAD_FUNCTION, String(path), typeorclass(targetfunction));

}

function loadfunction(path, key) {

    try {

        const target = require(path);

        return (key === undefined) ? target : target?.[key];

    } catch (error) {

        if( error?.code === ERRORCODE_MODULE_NOT_FOUND && isrelative(path) ) {

            const message = `It looks like you are trying to resolve a file module with a relative path. ` +
                            `resolvefunction() requires abolute paths to load file modules. ` +
                            `Prepend '__dirname' to the relative path and try again. ` + 
                            `Otherwise, make sure the file or package exists at the specified path.`

            error.message = message;

        }

        throw error;
    }
}