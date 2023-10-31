/**
 * @module defaultto
 */

'use strict';

const compose = require('./compose');
const curry = require('./curry');
const isvoid = require('./types/isvoid');

const coalesce = defaultvalue => value => isvoid(value) ? defaultvalue : value;

/**
 * [to do]
 * 
 * `defaultto()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `defaultto()`</caption>
 *     
 * const { defaultto } = require('functionish');
 * 
 * function loaduser(userid) { ... }
 * 
 * const getuser = defaultto( new AnonymousUser(), loaduser );
 * 
 * getuser(42);
 * 
 * @function defaultto
 * @param {any} defaultvalue The value to return if *func* returns a void value
 * @param {function} targetfunc The target function
 * @returns {function}
 */
function defaultto(defaultvalue, targetfunc) {
    return compose( coalesce(defaultvalue), targetfunc );
}


module.exports = curry(1, defaultto);