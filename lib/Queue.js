/**
 * @module lib/Queue
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const enqueueafter = (node, data) => (node.next = { data, next:NODE_NONE });

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

    dequeue() {

        if(this.#length === 0) return;

        const dequeuednode = this.#head.next;
        this.#head.next = dequeuednode.next;

        this.#length -= 1;
        if(this.#length === 0) this.#tail = this.#head;

        return dequeuednode.data;
    }

    dequeuemany(count) {

        count = +count;

        const next = (count-- > 0) && (this.length > 0)
                   ? { value:this.dequeue() }
                   : { done:true }

        const iterator = { next }
        return Array.from(iterator);
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

    toString() {
        return `Queue[${this.#length}]`;
    }

    get size() {
        return this.#length;
    }

    [Symbol.iterator](){

        const next = (this.#length === 0)
                   ? { done:true }
                   : { value:this.dequeue() }

        return { next }
    }
}

module.exports = Queue;