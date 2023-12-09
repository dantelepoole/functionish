/**
 * @module logic/not
 */

'use strict';

/**
 * Return the boolean complement (`!`) of the *value*'s boolish value.
 * 
 * @example <caption>Example usage of `not()`</caption>
 * 
 * const { not } = require('functionish/logic');
 * 
 * not(true); // returns false
 * not(false); // returns true
 * 
 * not(''); // falsy argument so returns true
 * not('false'); // truthy argument so returns false
 * not(1); // truthy argument so returns false
 * not(); // falsy argument so returns true
 * not({}); // truthy argument so returns false
 * 
 * @function not
 * @see {@link module:logic/negate negate()}
 * @param {any} value The value to return the boolean complement for.
 * @returns {boolean}
 */
function not(value) {
    return !value;
}

module.exports = not;