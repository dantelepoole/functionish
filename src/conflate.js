/**
 * @module conflate
 */

'use strict';

const conflatereducer = args => (_, func) => func(...args);

/**
 * to do
 * 
 * @example <caption>Example usage of `conflate()`</caption>
 * 
 * to do
 * 
 * @function conflate
 * @param  {...function} funcs One or more functions to conflate
 * @returns {function}
 */
function conflate(...funcs) {
    
    const _conflate = (...args) => funcs.reduce(conflatereducer(args), args[0]);

    return _conflate;
}

module.exports = conflate;