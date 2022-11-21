/**
* @module hassingleitem
*/

'use strict';

/**
 * Return `true` if *value* has a `length` or `size` property that is equal to `1`.
 * 
 * @func hassingleitem
 * @param {any} value An object with a `length`- or `size`-field
 * @returns {boolean}
 */
module.exports = function hassingleitem(value) {
    return (value?.length === 1) || ( (value?.length === undefined) && (value?.size === 1) );
}
