/**
 * @module promises/palways
 */

'use strict';

/**
 * [to do]
 * 
 * @example <caption>Example usage of `palways()`</caption>
 * 
 * [to do]
 * 
 */
function palways(x) {
    return () => Promise.resolve(x);
}

module.exports = palways;