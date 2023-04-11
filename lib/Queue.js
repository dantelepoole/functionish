/**
 * @module lib/Queue
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const enqueueafter = (node, data) => (node.next = { data, next:NODE_NONE });
const insertbefore = (node, data) => ({ data, next:node?.next });

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
        while(this.#length) yield this.dequeue();
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
                   : items.reduce(enqueueafter, this.#tail);

        this.#length += items.length;

        return this;
    }

    peek() {
        return this.#head.next?.data;
    }

    priority(...items) {

        this.#head.next = (items.length === 1)
                        ? ({ data:items[0], next:this.#head.next?.next })
                        : items.reduceRight(insertbefore, this.#head.next);
        
        this.#length += items.length;

        return this;
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

    [Symbol.iterator](){
        return this.values();
    }
}

module.exports = Queue;