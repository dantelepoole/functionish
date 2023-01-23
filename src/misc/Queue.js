/**
 * @module misc/Queue
 */

const EVENT_DEQUEUE = 'dequeue';
const EVENT_ENQUEUE = 'enqueue';
const EVENT_PRIORITY = 'priority';

const EventEmitter = require('events').EventEmitter;

const enqueuereducer = (currentnode, value) => (currentnode.next = { value });

class Queue extends EventEmitter {

    #head = undefined;
    #tail = undefined;
    #size = 0;

    constructor(...initialvalues) {
        super();
        this.enqueue(...initialvalues);
    }

    get size() {
        return this.#size;
    }

    clear() {
        this.#head = this.#tail = undefined;
        this.#size = 0;
        return this;
    }

    dequeue() {

        if(this.#size === 0) return;

        const headvalue = this.#head.value;
        
        this.#head = this.#head.next;
        this.#size -= 1;

        if(this.#size === 0) this.#tail = undefined;

        this.emit(EVENT_DEQUEUE, headvalue);

        return headvalue;
    }

    enqueue(...values) {

        const chain = buildnodechain(values);

        if(chain.length === 0) return this;

        if(this.#size === 0) this.#head = chain.first;
        else this.#tail.next = chain.first;

        this.#tail = chain.last;
        this.#size += chain.length;

        this.emit(EVENT_ENQUEUE, values);

        return this;
    }

    peek() {
        if(this.#head) return this.#head.value;
    }

    priority(...values) {

        const chain = buildnodechain(values);

        if(chain.length === 0) return this;
        
        chain.last.next = this.#head;
        this.#head = chain.first;
        
        if(this.#size === 0) this.#tail = chain.last;

        this.#size += chain.length;

        this.emit(EVENT_PRIORITY, values);

        return this;
    }

    *[Symbol.iterator]() {

        let node = { next:this.#head };

        while(node = node.next) yield node.value;
    }
}

function buildnodechain(values) {

    const first = {};
    const last = values.reduce(enqueuereducer, first);

    return { first:first.next, last, length:values.length }
}

module.exports = Queue;