/**
 * @module uniq
 */

'use strict';

/**
 * Return an array containing only the unique items in *list*, i.e. without any duplicate items.
 * 
 * @func uniq
 * @param {any[]} list The array of items to remove duplicates from
 * @returns {any[]}
 */
module.exports = function uniq(list) {
    return [ ...new Set(list) ];
}