/**
 * @module types/isinstanceof
 */

'use strict';

/**
 * Return true if *instance* is an instance of *targetclass*. Otherwise, return false.
 * 
 * @example
 * const isinstanceof = require('functionish/types/isinstanceof');
 * 
 * isinstanceof(Date, new Date()); // returns true
 * isinstanceof(Object, {}); // returns true
 * 
 * isinstanceof(Array, new Date()); // returns false
 * isinstanceof(Object, 42); // returns false
 * 
 * @function isinstanceof
 * @param {function} targetclass The class to check against
 * @param {object} instance The object to check the class for
 * @returns {boolean}
 */
module.exports = function isinstanceof(targetclass, instance) {
    return (instance instanceof targetclass);
}