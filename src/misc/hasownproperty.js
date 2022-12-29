/**
 * @module misc/hasownproperty
 */

'use strict';

const hasownproperty_native = Object.prototype.hasOwnProperty;

/**
 * Functional and safe variant of {@link external:Object.prototype.hasOwnProperty Object.property.hasOwnProperty()}.
 * 
 * @func hasownproperty
 * @param {object} object The object to check the properties of
 * @param {(string|symbol)} key The key of the property to look for
 * @returns {boolean}
 */
module.exports = function hasownproperty(key, object) {
    return hasownproperty_native.call(object, key)
}