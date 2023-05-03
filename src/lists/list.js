/**
 * @module lists/list
 */

'use strict';

function list(iterable) {

    return {
        *[Symbol.iterator]() {
            yield* iterable;
        }
    }
}