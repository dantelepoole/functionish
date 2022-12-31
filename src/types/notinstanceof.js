/**
 * @module types/notinstanceof
 */

'use strict';

/**
 * Return true if *instance* is not an instance of *targetclass*. Otherwise, return false.
 * 
 * @example
 * const notinstanceof = require('functionish/types/notinstanceof');
 * 
 * notinstanceof(Date, new Date()); // returns false
 * notinstanceof(Object, {}); // returns false
 * 
 * notinstanceof(Array, new Date()); // returns true
 * notinstanceof(Object, 42); // returns true
 * 
 * @func notinstanceof
 * @see {@link module:types/isinstanceof isinstanceof()}
 * @param {function} targetclass The class to check against
 * @param {object} instance The object to check the class for
 * @returns {boolean}
 */
module.exports = function notinstanceof(targetclass, instance) {
    return ! (instance instanceof targetclass);
}