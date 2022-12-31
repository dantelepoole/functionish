/**
 * @class Flag
 */

'use strict';

const bool = x => !!x;

class Flag {

    static get FALSE() {
        return new Flag(false);
    }

    static get TRUE() {
        return new Flag(true);
    }

    #value = false;

    constructor(initialvalue=false) {
        this.#value = bool(initialvalue);
    }

    flip() {
        return (this.#value = ! this.#value);
    }

    is(value) {
        
        return (typeof value === 'boolean') ? (value === this.#value)
             : (value instanceof Flag) ? (value.#value === this.#value)
             : (bool(value) === this.#value);
    }

    isFalse() {
        return (! this.#value);
    }

    isTrue() {
        return this.#value;
    }

    set(newvalue) {
        return (this.#value = bool(newvalue));
    }

    toBool() {
        return this.#value;
    }

    toString() {
        return `Flag[$${this.#value}]`;
    }

    value() {
        return this.#value;
    }
}

module.exports = Flag;