/**
 * @module misc/Stack
 */

const EVENT_POP = 'pop';
const EVENT_PUSH = 'push';

const EventEmitter = require('events').EventEmitter;

class Stack extends EventEmitter {

    #items = [];

    constructor(...initialvalues) {
        super();
        this.push(...initialvalues);
    }

    get size() {
        return this.#items.length;
    }

    clear() {
        this.#items.length = 0;
        return this;
    }

    peek() {
        if(this.#items.length) return this.#items[ this.#items.length - 1 ];
    }
    
    pop() {

        if(this.#items.length === 0) return;

        const value = this.#items.pop();

        this.emit(EVENT_POP, value);

        return value;
    }

    push(...values) {

        if(values.length === 0) return this;

        this.#items.push(...values);

        this.emit(EVENT_PUSH, values);

        return this;
    }

}

module.exports = Stack;