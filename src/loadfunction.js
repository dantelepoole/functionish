'use strict';

const DOT = '.';
const ERR_BAD_FUNCTION = "LoadFunctionError~The path '%s' resolved to a value with type %s. Expected a function.";
const ERRORCODE_MODULE_NOT_FOUND = 'MODULE_NOT_FOUND';
const HASHMARK = '#';

const fail = require('./misc/fail');
const isfunction = require('./types/isfunction');
const typeorclass = require('./types/typeorclass');

/**
 * Attempt to load the module or package specified by *targetpath* and return
 * its exported function. If its exported value is not a function, an error is thrown.
 * 
 * Optionally, the *targetpath* may be followed by a hash (`#`) and a property name, in which case the target function is
 * looked up on the exported object by the property name.
 * 
 * Important: `load()` only accepts absolute paths to file modules. To pass a path that is relative to the
 * current module, prepend the path with `__dirname`.
 * 
 * @example
 * 
 * const loadfunction = require('functionish/loadfunction');
 * 
 * function applyfunc(pathtofunc, ...args) {
 *      
 *    const func = loadfunction(pathtofunc);
 *    return func.apply(null, args);
 * }
 * 
 * const highestnumber = applyfunc('Math#random', 1,2,3,42); // returns 42
 * applyfunc(__dirname + '/utils#somemethod'); // runs the somemethod() method of the utils-module
 *                                             // in the 'utils'-subdirectory below the directory of the
 *                                             // current module1
 * 
 * @function loadfunction
 * @param {string} targetpath The module or package path to the function to return
 * @returns {function}
 */
function loadfunction(targetpath) {

    targetpath = String(targetpath);
    const [path, key] = targetpath.split(HASHMARK);
        
    const targetmodule = loadmodule(path);
    const targetfunction = key ? targetmodule[key] : targetmodule;

    isfunction(targetfunction) || fail(ERR_BAD_FUNCTION, targetpath, typeorclass(targetfunction));
    
    return targetfunction;
}

function loadmodule(path) {

    try {

        return require(path);

    } catch (error) {
        
        (error.code === ERRORCODE_MODULE_NOT_FOUND)
        && path.startsWith(DOT)
        && (error.message = `It looks like you are trying to resolve a file module with a relative path. ` +
        `load() can only load file modules from absolute paths. ` +
        `Prepend '__dirname' to the relative path and try again. ` + 
        `Otherwise, make sure the file or package exists at the specified path.`);
        
        throw error;
    }
}

module.exports = loadfunction;