/**
 * @module lib/List
 * @ignore
 */

'use strict';

class List {

    constructor(__iteratorfunction) {
        this[Symbol.iterator] = __iteratorfunction;
    }

    [Symbol.isConcatSpreadable] = true
}

module.exports = List;