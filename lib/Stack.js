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

    *drain() {

        const array = this.#array;
        while(array.length > 0) yield array.pop();
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

    get size() {
        return this.#array.length;
    }

}

module.exports = Stack;