/**
* @module lib/hasitems
* @ignore
*/

'use strict';

/**
 * Return `true` if *value* has `length` property that is greater than `0`. This function acts as counterpart to
 * {@link module:lib/isempty isempty()}.
 * 
 * @func hasitems
 * @see {@link module:lib/isempty isempty()}
 * @param {any} value The value to test
 * @returns {boolean}
 */
module.exports = function hasitems(value) {
    return (value?.length > 0);
}
