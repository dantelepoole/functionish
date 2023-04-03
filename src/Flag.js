/**
 * @class Flag
 */

'use strict';

const EVENT_FLIP = 'flip';
const HINT_NUMBER = 'number';
const HINT_STRING = 'string';
const NAME_EMPTY = undefined;

const EventEmitter = require('events');

class Flag extends EventEmitter {

    static off(name=NAME_EMPTY) {
        
        const flag = new Flag(false);
        flag.name = name;

        return flag;
    }

    static on(name=NAME_EMPTY) {
        
        const flag = new Flag(true);
        flag.name = name;

        return flag;
    }

    static for(initialvalue, name=NAME_EMPTY) {

        const flag = new Flag(initialvalue);
        flag.name = name;

        return flag;
    }

    name = NAME_EMPTY;
    #value = false;

    constructor(initialvalue=false) {
        super();
        this.#value = !! initialvalue;
    }

    flip() {
        this.#value = ! this.#value;

        this.emit(EVENT_FLIP, this.#name, this.#value);

        return this.#value;
    }

    is(value) {
        
        return (value instanceof Flag)
             ? (this.#value === value.#value)
             : (this.#value === !! value);
    }

    disable() {
        return this.set(false);
    }

    enable() {
        return this.set(true);
    }

    isdisabled() {
        return (! this.#value);
    }

    isenabled() {
        return this.#value;
    }

    reader() {
        return () => this.#value;
    }

    set(newvalue) {

        newvalue = !! newvalue;

        if(this.#value === newvalue) return this;

        this.#value = newvalue;

        this.emit(EVENT_FLIP, this.#name, newvalue);

        return this;
    }

    toString() {
        return `Flag[${this.#name}=${this.#value}]`;
    }

    value() {
        return this.#value;
    }

    [Symbol.toPrimitive](hint) {

        return (hint === HINT_STRING) ? String(this.#value)
             : (hint === HINT_NUMBER) ? this.#value ? 1 : 0
             : this.#value;
      }
}

module.exports = Flag;