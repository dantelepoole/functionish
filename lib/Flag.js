/**
 * @class Flag
 */

'use strict';

const DEFAULT_VALUE = false;
const EVENT_FLIP = 'flip';

const EventEmitter = require('events');

const id = x => x;
const isstring = x => (typeof x === 'string');
const tap = func => (...args) => (func(...args), args[0]);

class Flag extends EventEmitter {

    static False(name) {
        return new Flag(false, name);
    }

    static True(name) {
        return new Flag(true, name);
    }

    static Once(initialvalue=DEFAULT_VALUE, name) {
        
        const flag = new Flag(initialvalue, name);

        flag.#once = true;

        return flag;
    }

    static ReadOnly(initialvalue=DEFAULT_VALUE, name) {
        
        const flag = new Flag(initialvalue, name);

        flag.#mutable = false;

        return flag;
    }

    #name = undefined;
    #once = false;
    #mutable = true;
    #value = DEFAULT_VALUE;

    constructor(initialvalue=DEFAULT_VALUE, name) {

        super();
        
        this.#value = !!initialvalue;

        isstring(name) && (this.#name = name);
    }

    branch(truebranch=id, falsebranch=id) {
        return (...args) => this.#value ? truebranch(...args) : falsebranch(...args);
    }

    flip() {
        return this.set( !this.#value ).value;
    }

    ismutable() {
        return this.#mutable;
    }

    choose(truevalue, falsevalue) {
        return this.#value ? truevalue : falsevalue;
    }

    reader() {
        return () => this.#value;
    }

    writer() {
        return tap( this.set.bind(this) );
    }

    set(newvalue) {

        if( ! this.#mutable ) return this;

        newvalue = (newvalue instanceof Flag)
                 ? newvalue.value
                 : !! newvalue;

        if(this.#value !== newvalue) {

            this.#value = newvalue;
            
            this.#once && (this.#mutable = false);
            
            this.emit(EVENT_FLIP, newvalue, this.#name);
        }

        return this;
    }

    toString() {
        return `Flag[${this.name}]:${this.#value}`
    }

    watch(onchange) {
        this.on(EVENT_FLIP, onchange);
        return this;
    }

    unwatch(onchange) {
        this.removeListener(EVENT_FLIP, onchange);
        return this;
    }

    get name() {
        return this.#name;
    }

    get value() {
        return this.#value;
    }

    set value(newvalue) {
        this.set(newvalue);
    }

    get on() {
        return this.#value;
    }

    get off() {
        return ! this.#mutable;
    }

    [Symbol.toPrimitive](hint) {

        return (hint === 'string') ? String(this.#value)
             : (hint === 'number') ? +(this.#value)
             : this.#value;
      }
}

module.exports = Flag;