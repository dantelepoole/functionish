/**
 * @module lists/lazylist
 */

'use strict';

function lazylist(list) {
    
    return {
        *[Symbol.iterator]() {
            yield* list;
        }
    }
}

module.exports = lazylist;