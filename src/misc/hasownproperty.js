/**
 * @module misc/hasownproperty
 */

'use strict';

const curry2 = require('./curry2');

const hasownproperty_native = Object.prototype.hasOwnProperty;

/**
 * Alias for {@link external:Object.prototype.hasOwnProperty Object.property.hasOwnProperty()}
 * with flipped parameters.
 * 
 * `hasownproperty()` is curried by default with binary arity.
 * 
 * @function hasownproperty
 * @param {object} object The object to check the properties of
 * @param {(string|symbol)} key The key of the property to look for
 * @returns {boolean}
 */
function hasownproperty(key, object) {
    return hasownproperty_native.call(object, key)
}

module.exports = curry2(hasownproperty);