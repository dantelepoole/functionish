/**
 * @class Flag
 */

'use strict';

const EVENT_FLIP = 'flip';
const HINT_NUMBER = 'number';
const HINT_STRING = 'string';

const EventEmitter = require('events');

class Flag extends EventEmitter {

    static get OFF() {
        return new Flag(false);
    }

    static get ON() {
        return new Flag(true);
    }

    #value = false;

    constructor(initialvalue=false) {
        super();
        this.#value = !! initialvalue;
    }

    flip() {
        this.#value = ! this.#value;

        this.emit(EVENT_FLIP, this.#value);

        return this.#value;
    }

    is(value) {
        
        return (value instanceof Flag) ? (this.#value === value.#value)
             : (this.#value === !! value);
    }

    isoff() {
        return (! this.#value);
    }

    ison() {
        return this.#value;
    }

    reader() {
        return () => this.#value;
    }

    set(newvalue) {

        newvalue = !! newvalue;

        if(this.#value === newvalue) return this;

        this.#value = newvalue;

        this.emit(EVENT_FLIP, newvalue);

        return this;
    }

    toString() {
        return `Flag[$${this.#value}]`;
    }

    value() {
        return this.#value;
    }

    [Symbol.toPrimitive](hint) {
        
        return (hint === HINT_STRING) ? this.#value ? 'true' : 'false'
             : (hint === HINT_NUMBER) ? this.#value ? 1 : 0
             : this.#value;
      }
}

module.exports = Flag;