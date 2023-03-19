/**
 * @module lib/Queue
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const enqueuereducer = (node, data) => (node.next = { data });

class Queue {

    #length = 0;
    #head = {};
    #tail = this.#head;

    constructor(...initialitems) {
        this.enqueue(...initialitems);
    }

    clear() {
        
        this.#length = 0;
        this.#head.next = NODE_NONE;
        this.#tail = this.#head;

        return this;
    }

    *drain() {

        const head = this.#head;

        while(head.next !== NODE_NONE) {

            const data = head.next.data;

            head.next = head.next.next;

            this.#length -= 1;
            if(this.#length === 0) this.#tail = head;

            yield data;
        }
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

    values() {

        return {
            *[Symbol.iterator]() {

                let node = this.#head;

                while(node.next !== NODE_NONE) yield (node = node.next).data;
            }
        }
    }

    get size() {
        return this.#length;
    }

    *[Symbol.iterator](){
        yield* this.values();
    }
}

module.exports = Queue;