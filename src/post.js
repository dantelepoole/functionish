/**
 * @module post
 */

'use strict';

const curry = require('./curry');

/**
 * Return a function that invokes *func* and passes its return value to the *returnvalueprocessor*
 * function.
 * 
 * `post()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `post()`</caption>
 * 
 * const { post } = require('functionish');
 * 
 * function loaduser(userid) { ... }
 * function getanonymoususer() { ... }
 * 
 * const coalescetoanonymoususer = user => (user ?? getanonymoususer());
 * const loaduseroranonymous = post(coalescetoanonymoususer, loaduser);
 * 
 * loaduseroranonymous(42); // return user with id 42 or the anonymous user
 * 
 * @function post
 * @param {function} returnvalueprocessor The return value processor function
 * @param {function} func The target function
 * @returns {function}
 */
function post(returnvalueprocessor, func) {
    
    const _post = (...args) => returnvalueprocessor( func(...args) );

    return _post;
}

module.exports = curry(1, post);
