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
const isvoid = require('./isvoid');
const typeorclass = require('./typeorclass');

const ismodulenotfound = code => (code === ERRORCODE_MODULE_NOT_FOUND);
const isrelative = path => path.startsWith(DOT);
const tokenize = path => path.split(HASHMARK);

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
 * @param {(string|function)} func The function or the module or package path to the function to return
 * @returns {function}
 */
module.exports = function resolvefunction(func) {
    return isfunction(func) ? func : loadfunctionfrommodule(func);
}

function loadfunctionfrommodule(modulepath) {

    modulepath = String(modulepath);
    const [path, key] = tokenize(modulepath);
    
    let target = undefined;
    
    try {

        target = isvoid(key) ? require(path) : require(path)?.[key];

    } catch (error) {

        ismodulenotfound(error.code)
        && isrelative(path)
        && (error.message = `It looks like you are trying to resolve a file module with a relative path. ` +
                            `resolvefunction() requires abolute paths to load file modules. ` +
                            `Prepend '__dirname' to the relative path and try again. ` + 
                            `Otherwise, make sure the file or package exists at the specified path.`);

        throw error;
    }

    return isfunction(target) ? target : fail(ERR_BAD_FUNCTION, modulepath, typeorclass(target));
}