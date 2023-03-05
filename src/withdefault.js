/**
 * @module withdefault
 */

'use strict';

const curry = require('./curry');
const isvoid = require('./types/isvoid');

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
 * @returns {function}
 */
function withdefault(defaultvalue, func) {

    return function _withdefault(...args) {

        const result = func(...args);
        
        return isvoid(result) ? defaultvalue : result;
    }
}

module.exports = curry(1, withdefault);