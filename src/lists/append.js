/**
 * @module lists/append
 */

'use strict';

const EMPTY_STRING = '';

const isstring = require('../types/isstring');

/**
 * to do
 * 
 * @function append
 */
function append(base, ...items) {

    return isstring(base)
         ? base + items.join(EMPTY_STRING)
         : appenditerable(base, items);
}

function appenditerable(list, items) {

    return {
        [Symbol.iterator] : function* () {
            yield* list;
            yield* items;
        }
    }
}

module.exports = append;