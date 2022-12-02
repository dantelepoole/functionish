/**
* @module issingular
*/

'use strict';

/**
 * Return `true` if the value of *list*'s property equals `1`. If *list* has no `length` property, its
 * `size` property is checked instead.
 * 
 * @example
 * 
 * @func issingular
 * @param {any} list An object with a numeric `length` or `size` property.
 * @returns {boolean}
 */
module.exports = function issingular(list) {
    return (list?.length ?? list?.size) === 1;
}
