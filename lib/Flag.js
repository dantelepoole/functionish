/**
 * @class Flag
 */

'use strict';

const DEFAULT_VALUE = false;
const EVENT_FLIP = 'flip';

const EventEmitter = require('events');

const always = require('../src/always');
const isfunction = require('../src/types/isfunction');

class Flag extends EventEmitter {

    static False() {
        return new Flag(false);
    }

    static True() {
        return new Flag(true);
    }

    static Once(initialvalue=DEFAULT_VALUE) {
        
        const flag = new Flag(initialvalue);

        flag.#once = true;

        return flag;
    }

    static ReadOnly(initialvalue=DEFAULT_VALUE) {
        return new Flag(initialvalue, true);
    }

    #once = false;
    #mutable = true;
    #value = DEFAULT_VALUE;

    #setter = this.set.bind(this);

    constructor(initialvalue=DEFAULT_VALUE, readonly=false) {
        super();
        this.#value = !!initialvalue;
        this.#mutable = !readonly;
    }

    wrap(truebranch, falsebranch) {

        isfunction(truebranch) || (truebranch = always(truebranch));
        isfunction(falsebranch) || (truebranch = always(falsebranch));

        return (...args) => (this.#value && truebranch || falsebranch)(...args);
    }

    flip() {
        return this.set( !this.#value ).value;
    }

    ismutable() {
        return this.#mutable;
    }

    isfollowing(leadflag) {
        return leadflag.listeners(EVENT_FLIP).includes(this.#setter);
    }

    follow(leadflag) {

        if(this.#mutable) {

            this.set(leadflag);

            this.isfollowing(leadflag) || leadflag.on(EVENT_FLIP, this.#setter);
        }

        return this;
    }

    unfollow(leadflag) {

        this.isfollowing(leadflag) && leadflag.removeListener(EVENT_FLIP, this.#setter);

        return this;
    }

    choose(truevalue, falsevalue) {
        return this.#value ? truevalue : falsevalue;
    }

    reader() {
        return () => this.#value;
    }

    writer() {
        return value => (this.set(value), this.#value);
    }

    set(newvalue) {

        newvalue = (newvalue instanceof Flag)
                 ? newvalue.value
                 : !! newvalue;

        if( (this.#value !== newvalue) && this.#mutable ) {

            this.#value = newvalue;
            
            this.#once && (this.#mutable = false);
            
            this.emit(EVENT_FLIP, newvalue);
        }

        return this;
    }

    toString() {
        return `Flag[${this.#value}]`;
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
        return !this.#value;
    }

    get enabled() {
        return this.#value;
    }

    get disabled() {
        return !this.#value;
    }

    get active() {
        return this.#value;
    }

    get inactive() {
        return this.#value;
    }

    [Symbol.toPrimitive](hint) {

        return (hint === 'string') ? String(this.#value)
             : (hint === 'number') ? +(this.#value)
             : this.#value;
      }
}

module.exports = Flag;