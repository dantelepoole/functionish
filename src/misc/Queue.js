/**
 * @module misc/queue
 */

'use strict';

const NODE_NONE = undefined;

const enqueuereducer = (node, data) => (node.next = { data });

class Queue {

    #length = 0;
    #head = {};
    #tail = NODE_NONE;

    constructor(...initialitems) {

        this.#tail = this.#head;
        
        if(initialitems.length) {
            this.#tail = initialitems.reduce(enqueuereducer, this.#tail);
            this.#length = initialitems.length;
        }
    }

    clear() {
        
        this.#length = 0;
        this.#head.next = NODE_NONE;
        this.#tail = this.#head;

        return this;
    }

    drain() {
        return [...this];
    }

    dequeue() {

        if(this.#length === 0) return;
        
        const node = this.#head.next;
        this.#head.next = node.next;
        
        this.#length -= 1;
        if(this.#length === 0) this.#tail = this.#head;

        return node.data;
    }

    enqueue(...items) {

        this.#tail = items.reduce(enqueuereducer, this.#tail);
        this.#length += items.length;

        return this;
    }

    peek() {
        return this.#head.next?.data;
    }

    toString() {
        return `Queue[${this.#length}]`;
    }

    *values() {
        
        let node = this.#head;

        while(node.next !== NODE_NONE) yield (node = node.next).data;
    }

    get size() {
        return this.#length;
    }

    *[Symbol.iterator](){
        while(this.#length > 0) yield this.dequeue();
    }
}

module.exports = Queue;