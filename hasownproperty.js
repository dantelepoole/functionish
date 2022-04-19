/**
 * @module hasownproperty
 */

/**
 * Functional and safe variant of {@link external:Object.prototype.hasOwnProperty Object.property.hasOwnProperty()}.
 * 
 * `hasownproperty()` is curried by default.
 * 
 * @func hasownproperty
 * @param {object} object The object to check the properties of
 * @param {(string|symbol)} key The key of the property to look for
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function hasownproperty(key, object) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

)