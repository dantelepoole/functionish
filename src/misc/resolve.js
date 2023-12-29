/**
 * @module misc/resolve
 */

'use strict';

const ERR_BAD_FUNCTION = `functionish/misc/resolve(): The target path '%s' resolved to a %s value. Expected a function.`;
const HASHMARK = '#';

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadfunction = compose(raise, error.Type(ERR_BAD_FUNCTION));
const requirepluck = (path, key) => require(path)[key];

/**
 * Attempt to load the module or package specified by *targetpath* and return
 * its exported function. If its exported value is not a function, an error is thrown.
 * 
 * Optionally, the *targetpath* may include a hash (`#`) followed by a property key, in which case the target
 * function is looked up on the exported object by the property key.
 * 
 * `resolve()` only resolves file modules only by their absolute path. To pass a path that is relative to the
 * current module, prepend the path with `__dirname`.
 * 
 * @example <caption>Example usage of `resolve()`</caption>
 * 
 * const { resolve } = require('functionish/misc');
 * 
 * function applyfunc(pathtofunc, ...args) {
 *    return resolve(pathtofunc).apply(null, args);
 * }
 * 
 * const highestnumber = applyfunc('Math#random', 1,2,3,42); // returns 42
 * 
 * applyfunc(__dirname + '/utils#somemethod'); // runs the somemethod() method of the utils-module
 *                                             // in the 'utils'-subdirectory below the directory of the
 *                                             // current module1
 * 
 * @function resolve
 * @param {string} targetpath The module or package path to the function to return
 * @returns {function}
 */
function resolve(targetpath) {

    targetpath = String(targetpath);

    const target = targetpath.includes(HASHMARK)
                 ? requirepluck( ...targetpath.split(HASHMARK) )
                 : require(targetpath);

    isfunction(target) || raisebadfunction(targetpath, typeorclassname(target));
    
    return target;
}

module.exports = resolve;