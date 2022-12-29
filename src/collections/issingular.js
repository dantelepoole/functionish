/**
* @module collections/issingular
*/

'use strict';

/**
 * Return `true` if the value of *countable*'s property equals `1`. If *countable* has no `length` property, its
 * `size` property is checked instead.
 * 
 * @func issingular
 * @param {any} countable An object with a numeric `length` or `size` property.
 * @returns {boolean}
 */
module.exports = function issingular(countable) {
    return (countable.length ?? countable.size) === 1;
}
