/**
 * @module withdefault
 */

'use strict';

const compose = require('./compose');
const curry = require('./curry');
const isvoid = require('./types/isvoid');

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
 * @param {function} targetfunc The target function
 * @returns {function}
 */
function withdefault(defaultvalue, targetfunc) {
    return compose( coalesce(defaultvalue), targetfunc );
}


module.exports = curry(1, withdefault);