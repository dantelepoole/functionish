/**
 * @module misc/Queue
 */

const EVENT_DEQUEUE = 'dequeue';
const EVENT_ENQUEUE = 'enqueue';
const EVENT_PRIORITY = 'priority';

const EventEmitter = require('events').EventEmitter;

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

        if(this.#head === undefined) return;

        const nextvalue = this.#head.value;
        
        this.#head = this.#head.next;
        if(this.#head === undefined) this.#tail = undefined;

        this.#size -= 1;

        this.emit(EVENT_DEQUEUE, nextvalue);

        return nextvalue;
    }

    enqueue(...values) {

        if(values.length === 0) return this;

        for(const value of values) {

            if(this.#tail === undefined) this.#head = this.#tail = { value }
            else this.#tail = this.#tail.next = { value }
        }

        this.#size += values.length;

        this.emit(EVENT_ENQUEUE, values);

        return this;
    }

    peek() {
        if(this.#head) return this.#head.value;
    }

    priority(...values) {

        if(values.length === 0) return this;

        let firstnode = undefined;
        let lastnode = undefined;

        for(const value of values) {

            if(lastnode === undefined) firstnode = lastnode = { value };
            else lastnode = lastnode.next = { value }
        }

        lastnode.next = this.#head;
        this.#head = firstnode;

        if(this.#tail === undefined) this.#tail = lastnode;

        this.#size += values.length;

        this.emit(EVENT_PRIORITY, values);

        return this;
    }

    *[Symbol.iterator]() {

        if(this.#head === undefined) return;

        let node = copynodes(this.#head);

        while(node) {
            yield node.value;
            node = node.next;
        }
    }
}

function copynodes(startnode) {

    const nodechain = { value:startnode.value, next:startnode.next }

    let node = nodechain;

    while(node.next) node = node.next = { value:node.next.value, next:node.next.next }

    return nodechain;
}

module.exports = Queue;