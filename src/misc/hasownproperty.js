/**
 * @module misc/hasownproperty
 */

'use strict';

const curry = require('./curry');

const hasownproperty_native = Object.prototype.hasOwnProperty;

/**
 * Alias for {@link external:Object.prototype.hasOwnProperty Object.property.hasOwnProperty()}
 * with flipped parameters.
 * 
 * `hasownproperty()` is curried by default with unary arity.
 * 
 * @function hasownproperty
 * @param {object} object The object to check the properties of
 * @param {(string|symbol)} key The key of the property to look for
 * @returns {boolean}
 */
function hasownproperty(key, object) {
    return hasownproperty_native.call(object, key)
}

module.exports = curry(1, hasownproperty);