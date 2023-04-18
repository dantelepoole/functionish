/**
* @module arrays/issingular
*/

'use strict';

/**
 * Return `true` if the value of *collection*'s `length` property equals `1`. If *collection* has no `length` property,
 * its `size` property is checked instead. If *collection* has neither a `length` property nor a `size` property, this
 * function returns `false`.
 * 
 * @func issingular
 * @param {any} collection An object with a numeric `length` or `size` property.
 * @returns {boolean}
 */
function issingular(collection) {
    return (collection.length ?? collection.size) === 1;
}

module.exports = issingular;
