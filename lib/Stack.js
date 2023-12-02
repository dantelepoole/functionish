/**
 * @module lib/Stack
 * @ignore
 */

'use strict';

class Stack {

    #array;

    constructor(...initialitems) {
        this.#array = initialitems;
    }

    clear() {

        this.#array.length = 0;
        return this;
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

    *values() {
        for(let i = this.#array.length-1; i >= 0; i -= 1) yield this.#array[i];
    }

    get size() {
        return this.#array.length;
    }

    *[Symbol.iterator]() {
        while(this.#array.length > 0) yield this.#array.pop();
    }
}

module.exports = Stack;