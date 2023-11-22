/**
 * @module defaultto
 */

'use strict';

const compose = require('./compose');
const curry1 = require('./curry1');
const isvoid = require('./types/isvoid');

const coalesce = defaultvalue => value => isvoid(value) ? defaultvalue : value;

/**
 * Return a function that passes its arguments to *targetfunc* and returns its return value. If the return value
 * is <abbrev caption="null or undefined">void</abbrev>, *defaultvalue* is returned instead.
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
 * @param {any} defaultvalue The value to return if *targetfunc* returns a <abbrev caption="null or undefined">void</abbrev> value
 * @param {function} targetfunc The target function
 * @returns {function}
 */
const defaultto = curry1(function defaultto(defaultvalue, targetfunc) {
    return compose( coalesce(defaultvalue), targetfunc );
})


module.exports = defaultto;