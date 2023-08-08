/**
 * @module wrap
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const partial = require('./partial');

/**
 * to do
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * to do
 * 
 * @function wrap
 * @param {function} wrapperfunc The function to wrap *targetfunc* with
 * @param {function} targetfunc The function to wrap
 * @returns {function}
 */
function wrap(wrapperfunc, targetfunc, ...partialargs) {

    return isarray(wrapperfunc)
         ? _wrappedcompose.bind(THIS_NULL, wrapperfunc, targetfunc, ...partialargs)
         : partial(wrapperfunc, targetfunc, ...partialargs);

}

function _wrappedcompose(wrappers, targetfunc, ...args) {

    let index = 0;
    const next = (...nextargs) => (index === wrappers.length)
                                ? targetfunc(...nextargs)
                                : wrappers[index++](next, ...nextargs);

    return next(...args);
}

module.exports = curry(1, wrap);
