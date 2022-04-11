/**
 * @module uniq
 */

'use strict';

const isiterable = require('./isiterable');

/**
 * Return an array containing only the unique items in *list*, i.e. without any duplicate items. If *list* is not
 * iterable, a single item array containing *list* as its only item is returned, unless *list* is `undefined`, in which
 * case an empty array is returned.
 * 
 * @func uniq
 * @param {(array|iterable|any)} list The list of items to remove duplicates from
 * @returns {any[]}
 */
module.exports = function uniq(list) {
    
    return isiterable(list) ? [...new Set(list)]
         : (list !== undefined) ? [list]
         : [];
}