/**
 * @module lists/shadowlist
 */

'use strict';

function shadowlist(list) {
    
    return {
        *[Symbol.iterator]() {
            yield* list;
        }
    }
}

module.exports = shadowlist;