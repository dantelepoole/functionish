/**
 * @module lib/Queue
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const enqueuereducer = (node, data) => (node.next = { data, next:NODE_NONE });

class Queue {

    #length = 0;
    #head = { next:NODE_NONE };
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

            const nextnode = head.next;
            head.next = nextnode.next;

            this.#length -= 1;
            if(this.#length === 0) this.#tail = head;

            yield nextnode.data;
        }
    }

    dequeue() {

        if(this.#length === 0) return;

        const dequeuednode = this.#head.next;
        this.#head.next = dequeuednode.next;

        this.#length -= 1;
        if(this.#length === 0) this.#tail = this.#head;

        return dequeuednode.data;
    }

    enqueue(...items) {

        this.#tail = (items.length === 1)
                   ? (this.#tail.next = { data:items[0], next:NODE_NONE })
                   : items.reduce(enqueuereducer, this.#tail);

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

                while(node = node.next) yield node.data;
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