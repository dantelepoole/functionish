/**
 * @module lib/Stack
 * @ignore
 */

'use strict';

class Stack {

    #array = [];

    constructor(...initialitems) {
        this.#array.push(...initialitems);
    }

    clear() {

        this.#array.length = 0;

        return this;
    }

    *drain() {
        while(this.#array.length > 0) yield this.#array.pop();
    }

    peek() {
        return this.#array[ this.#array.length-1 ];
    }

    pop() {
        return this.#array.pop();
    }

    push(...items) {

        this.#array.push(...items);

        return this;
    }

    toString() {
        return `Stack[${this.#array.length}]`;
    }

    values() {
        return this.#array.values();
    }

    get size() {
        return this.#array.length;
    }

    [Symbol.iterator]() {
        return this.#array.values();
    }
}

module.exports = Stack;