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

    dequeue(count = 1) {

        if(this.#length === 0) return;
        if(count !== 1) return this.#dequeuemany(count);

        const dequeuednode = this.#head.next;
        this.#head.next = dequeuednode.next;

        this.#length -= 1;
        if(this.#length === 0) this.#tail = this.#head;

        return dequeuednode.data;
    }

    #dequeuemany(count) {

        count = +count;

        const items = [];
        let node = this.#head;

        while(count > 0 && node.next !== NODE_NONE) {

            count -= 1;
            node = node.next;

            items.push(node.data);
        }

        if(items.length > 0) {
            this.#head.next = node.next;
            this.#length -= items.length;
        }

        if(this.#length === 0) this.#tail = this.#head;

        return items;
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