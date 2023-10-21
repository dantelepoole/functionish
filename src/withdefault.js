/**
 * @module withdefault
 */

'use strict';

const compose = require('./compose');
const curry = require('./curry');
const isvoid = require('./types/isvoid');
const partial = require('./partial');

const coalesce = defaultvalue => value => isvoid(value) ? defaultvalue : value;

/**
 * [to do]
 * 
 * `withdefault()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `withdefault()`</caption>
 *     
 * const { withdefault } = require('functionish');
 * 
 * function loaduser(userid) { ... }
 * 
 * const getuser = withdefault( new AnonymousUser(), loaduser );
 * 
 * getuser(42);
 * 
 * @function withdefault
 * @param {any} defaultvalue The value to return if *func* returns a void value
 * @param {function} func The target function
 * @param {...any[]} partialargs Optional arguments to pass to *func*
 * @returns {function}
 */
function withdefault(defaultvalue, func, ...partialargs) {
    return compose( coalesce(defaultvalue), partial(func, ...partialargs) );
}


module.exports = curry(1, withdefault);