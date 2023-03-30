/**
 * @module lib/Stack
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const pushreducer = (node, data) => ({ data, next:node.next });

class Stack {

    #length = 0;
    #head = { next:NODE_NONE };

    constructor(...initialitems) {
        this.push(...initialitems);
    }

    clear() {

        this.#length = 0;
        this.head.next = NODE_NONE;

        return this;
    }

    *drain() {

        const head = this.#head;

        while(head.next !== NODE_NONE) {

            const nextnode = head.next;
            head.next = nextnode.next;

            this.#length -= 1;

            yield nextnode.data;
        }
    }

    peek() {
        return this.#head.next?.data;
    }

    pop() {

        if(this.#length === 0) return;
        
        const poppednode = this.#head.next;
        this.#head.next = poppednode.next;

        this.#length -= 1;

        return poppednode.data;
    }

    push(...items) {

        this.#head.next = (items.length === 1)
                        ? { data:items[0], next:this.#head.next }
                        : items.reduce(pushreducer, this.#head.next);
        
        this.#length += items.length;

        return this;
    }

    toString() {
        return `Stack[${this.#length}]`;
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

    *[Symbol.iterator]() {
        yield* this.values();
    }
}

module.exports = Stack;