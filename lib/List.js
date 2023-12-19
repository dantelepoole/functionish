/**
 * @module lib/List
 * @ignore
 */

'use strict';

class List {

    constructor(aaiteratorfunction) {
        this[Symbol.iterator] = aaiteratorfunction;
    }

    [Symbol.iterator]

    [Symbol.isConcatSpreadable] = true
}

module.exports = Stack;