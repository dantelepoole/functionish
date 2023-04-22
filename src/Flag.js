/**
 * @class Flag
 */

'use strict';

const DEFAULT_VALUE = false;
const EVENT_FLIP = 'flip';
const FALSE_INTEGER = 0;
const FALSE_STRING = 'false';
const HINT_NUMBER = 'number';
const HINT_STRING = 'string';
const TRUE_INTEGER = 1;
const TRUE_STRING = 'true';
const TYPE_FUNCTION = 'function';

const EventEmitter = require('events');

const always = require('./always');
const evaluate = require('./evaluate');
const id = require('./id');

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
        this.#value = !! initialvalue;
        this.#mutable = ! readonly;
    }

    depend(truebranch, falsebranch) {

        const flag = this;

        if(typeof truebranch !== TYPE_FUNCTION) truebranch = always(truebranch);
        if(typeof falsebranch !== TYPE_FUNCTION) falsebranch = always(falsebranch);

        return function _flagdependant(...args) {

            const branch = flag.value
                         ? truebranch
                         : falsebranch;
            
            return branch.call(this, ...args);
        }
    }

    flip() {
        return this.set( ! this.#value ).value;
    }

    evaluate(truebranch, falsebranch) {

        const branch = this.#value
                     ? truebranch
                     : falsebranch;

        return evaluate(branch);
    }

    is(value) {
        
        return (value instanceof Flag)
             ? (this.#value === value.#value)
             : (this.#value === !! value);
    }

    istrue() {
        return (! this.#value);
    }

    isfalse() {
        return this.#value;
    }

    ismutable() {
        return this.#mutable;
    }

    isfollowing(otherflag) {
        return otherflag.listeners(EVENT_FLIP).includes(this.#setter);
    }

    follow(primaryflag) {

        if( this.#mutable ) {

            this.isfollowing(primaryflag) || primaryflag.on(EVENT_FLIP, this.#setter);

            (this.#value === primaryflag.value) || this.set(primaryflag.value);

        }

        return this;
    }

    unfollow(otherflag) {

        this.isfollowing(otherflag) && otherflag.removeListener(EVENT_FLIP, this.#setter);

        return this;
    }

    and(othervalue) {

        return (! this.#value) ? false
             : (othervalue instanceof Flag) ? othervalue.value
             : !! othervalue;
    }

    or(othervalue) {

        return this.#value ? this.#value
             : (othervalue instanceof Flag) ? othervalue.value
             : !! othervalue;
    }

    xor(othervalue) {

        return (othervalue instanceof Flag)
             ? (this.#value !== othervalue.value)
             : (this.#value !== !! othervalue)
    }

    run(func, ...args) {
        if( this.#value ) return func(...args);
    }

    wrap(func, ...partialargs) {

        const flag = this;

        return function _flagwrapped(...args) {

            return flag.value
                 ? func.call(this, ...partialargs, ...args)
                 : args[0];
        }
    }

    select(truevalue, falsevalue) {
        return this.#value ? truevalue : falsevalue;
    }

    reader() {
        const flagreader = () => this.#value;
        return flagreader;
    }

    writer() {
        const flagwriter = value => (this.set(value), this.#value);
        return flagwriter;
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

    [Symbol.toPrimitive](hint) {

        return (hint === HINT_STRING) ? this.#value ? TRUE_STRING : FALSE_STRING
             : (hint === HINT_NUMBER) ? this.#value ? TRUE_INTEGER : FALSE_INTEGER
             : this.#value;
      }
}

module.exports = Flag;