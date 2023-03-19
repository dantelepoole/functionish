/**
 * @module lib/Stack
 * @ignore
 */

'use strict';

const NODE_NONE = undefined;

const insertafter = (node, data) => (node.next = { data, next:node.next });
const pushreducer = (node, data) => ( insertafter(node, data), node );

class Stack {

    #length = 0;
    #head = {};

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

            const data = head.next.data;
            head.next = head.next.next;

            this.#length -= 1;

            yield data;
        }
    }

    peek() {
        return this.#head.next?.data;
    }

    pop() {

        if(this.#length === 0) return;
        this.#length -= 1;

        const node = this.#head.next;
        this.#head.next = node.next;

        return node.data;
    }

    push(...items) {

        this.#head = items.reduce(pushreducer, this.#head);
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

                while(node.next !== NODE_NONE) yield (node = node.next).data;
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