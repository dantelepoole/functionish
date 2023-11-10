/**
 * @module misc/issingular
 */

'use strict';

/**
 * [to do]
 * 
 * @example <caption>Example usage of `issingular()`</caption>
 * 
 * to do 
 * 
 * @function issingular
 * @param {any} collection The collection to check
 * @returns {boolean}
 * 
 */
function issingular(collection) {
    return (collection.length ?? collection.size) === 1;
}

module.exports = issingular;