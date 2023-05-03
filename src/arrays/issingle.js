/**
 * @module arrays/issingle
 */

'use strict';

const SINGLE = 1;

/**
 * to do
 * @example <caption>Example usage of `issingle()`</caption>
 *     
 * to do
 * 
 * @function issingle
 */
function issingle(collection) {
    return (SINGLE === collection.length ?? collection.size);
}

module.exports = issingle;