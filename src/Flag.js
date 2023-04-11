/**
 * @class Flag
 */

'use strict';

const DEFAULT_VALUE = false;
const EVENT_FLIP = 'flip';
const HINT_NUMBER = 'number';
const HINT_STRING = 'string';
const NAME_NONE = undefined;
const OFF_INTEGER = 0;
const OFF_STRING = 'off';
const ON_INTEGER = 1;
const ON_STRING = 'on';

const EventEmitter = require('events');

class Flag extends EventEmitter {

    static OFF(name=NAME_NONE) {
        return new Flag(false, name);
    }

    static ON(name=NAME_NONE) {
        return new Flag(true, name);
    }

    static for(initialvalue, name=NAME_NONE) {
        return new Flag(initialvalue, name);
    }

    name = NAME_NONE;
    #value = DEFAULT_VALUE;

    constructor(initialvalue=DEFAULT_VALUE, name=NAME_NONE) {
        super();
        this.#value = !! initialvalue;
        this.name = name;
    }

    flip() {
        this.#value = ! this.#value;

        this.emit(EVENT_FLIP, this.name, this.#value);

        return this.#value;
    }

    is(value) {
        
        return (value instanceof Flag)
             ? (this.#value === value.#value)
             : (this.#value === !! value);
    }

    setoff() {
        return this.set(false);
    }

    seton() {
        return this.set(true);
    }

    ison() {
        return (! this.#value);
    }

    isoff() {
        return this.#value;
    }

    reader() {
        const flagreader = () => this.#value;
        return flagreader;
    }

    set(newvalue) {

        newvalue = !! newvalue;

        if(this.#value === newvalue) return this;

        this.#value = newvalue;

        this.emit(EVENT_FLIP, this.name, newvalue);

        return this;
    }

    toString() {
        return `Flag[${this.name}=${this.#value}]`;
    }

    value() {
        return this.#value;
    }

    [Symbol.toPrimitive](hint) {

        return (hint === HINT_STRING) ? this.#value ? ON_STRING : OFF_STRING
             : (hint === HINT_NUMBER) ? this.#value ? ON_INTEGER : OFF_INTEGER
             : this.#value;
      }
}

module.exports = Flag;