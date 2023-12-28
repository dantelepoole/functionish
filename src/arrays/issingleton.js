/**
 * @module arrays/issingleton
 */

'use strict';

/**
 * to do
 * @example <caption>Example usage of `issingleton()`</caption>
 *     
 * to do
 * 
 * @function issingleton
 */
function issingleton(collection) {
    return (1 === collection.length ?? collection.size);
}

module.exports = issingleton;