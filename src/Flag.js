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

class Flag extends EventEmitter {

    static False(once=false) {
        return new Flag(false, once);
    }

    static True(once=false) {
        return new Flag(true, once);
    }

    static Once(initialvalue=DEFAULT_VALUE) {
        return new Flag(initialvalue, true);
    }

    static ReadOnly(initialvalue=DEFAULT_VALUE) {

        const flag = new Flag(initialvalue);
        flag.#mutable = false;

        return flag;
    }

    #once = false;
    #mutable = true;
    #value = DEFAULT_VALUE;

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

    execute(truebranch, falsebranch) {

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
            
            const emitdeferred = () => this.emit(EVENT_FLIP, newvalue);
            queueMicrotask(emitdeferred);
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