/**
 * @module take
 */

'use strict';

/**
 * Return the *count* number or items or characters from the the *list* array or string.
 * 
 * If *count* is negative, an empty array or string is returned.
 * 
 * `take()` is curried by default.
 * 
 * @func take
 * @param {number} count The number of items to take from *list*
 * @param {(any[]|string)} list The string or array to take the items from
 * @returns {(any[]|string)}
 */
module.exports = require('./curry2')(

    function take(count, list) {

        count = Math.max(0, count);

        return list.slice(0, count);

    }
)