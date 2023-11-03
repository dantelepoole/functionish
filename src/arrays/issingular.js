/**
 * @module arrays/issingular
 */

'use strict';

const SINGLE = 1;

/**
 * to do
 * @example <caption>Example usage of `issingular()`</caption>
 *     
 * to do
 * 
 * @function issingle
 */
function issingular(collection) {
    return (SINGLE === collection.length ?? collection.size);
}

module.exports = issingular;