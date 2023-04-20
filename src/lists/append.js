/**
 * @module lists/append
 */

'use strict';

const EMPTY_STRING = '';
const TYPE_STRING = 'string';

/**
 * to do
 * 
 * @function append
 */
function append(base, ...items) {

    return (typeof base === TYPE_STRING)
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