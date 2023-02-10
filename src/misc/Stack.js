/**
 * @module misc/Stack
 */

class Stack {

    #items = [];

    constructor(...initialvalues) {
        super();
        this.#items.push(...initialvalues);
    }

    get size() {
        return this.#items.length;
    }

    clear() {
        this.#items.length = 0;
        return this;
    }

    peek() {
        if(this.#items.length > 0) return this.#items[ this.#items.length - 1 ];
    }
    
    pop() {
        if(this.#items.length > 0) return this.#items.pop();
    }

    push(...values) {

        this.#items.push(...values);

        return this;
    }

    *[Symbol.iterator]() {
        yield* this.#items;
    }

}

module.exports = Stack;