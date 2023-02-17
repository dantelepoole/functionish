/**
 * @module withdefault
 */

'use strict';

const always = require('./always');
const compose = require('./compose');
const curry2 = require('./curry2');
const curryfunction = require('../lib/curryfunction');
const isvoid = require('./types/isvoid');
const when = require('./when');

/**
 * Return a function that passes *func* and its arguments to *wrapperfunc* and returns the result, allowing
 * wrapperfunc to pre-process *func*'s arguments and/or post-process *func*'s return value.
 * 
 * Both *func* and *wrapperfunc* must be functions. *Wrapperfunc* should have the signature 
 * `wrapperfunc(func, ...args)` and must invoke *func* itself.
 * 
 * `wrap()` is curried by default with binary arity. Also, currying is preserved. If *func* has 
 * been curried (i.e. it has been passed to {@link module:curry curry()}), the returned function will
 * be curried with the same arity.
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

    return func.arity
         ? curryfunction(func.arity, _withdefault)
         : _withdefault;

    function _withdefault(...args) {

        const result = func(...args);
        
        return isvoid(result) ? defaultvalue : result;
    }
}

module.exports = curry2(withdefault);