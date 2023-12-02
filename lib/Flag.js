/**
 * @class Flag
 */

'use strict';

const DEFAULT_STATE = false;
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

    static Once(initialstate=DEFAULT_STATE, name) {
        
        const flag = new Flag(initialstate, name);

        flag.#once = true;

        return flag;
    }

    static ReadOnly(initialstate=DEFAULT_STATE, name) {
        
        const flag = new Flag(initialstate, name);

        flag.#mutable = false;

        return flag;
    }

    #name = undefined;
    #once = false;
    #mutable = true;
    #state = DEFAULT_STATE;

    constructor(initialvalue=DEFAULT_STATE, name) {

        super();
        
        this.#state = !!initialvalue;

        isstring(name) && (this.#name = name);
    }

    branch(truebranch=id, falsebranch=id) {
        return (...args) => this.#state ? truebranch(...args) : falsebranch(...args);
    }

    flip() {
        return this.set( !this.#state ).state;
    }

    ismutable() {
        return this.#mutable;
    }

    choose(truevalue, falsevalue) {
        return this.#state ? truevalue : falsevalue;
    }

    reader() {
        return () => this.#state;
    }

    writer() {
        return tap( this.set.bind(this) );
    }

    set(newstate) {

        if( ! this.#mutable ) return this;

        newstate = (newstate instanceof Flag)
                 ? newstate.state
                 : !! newstate;

        if(this.#state !== newstate) {

            this.#state = newstate;
            
            this.#once && (this.#mutable = false);
            
            this.emit(EVENT_FLIP, newstate, this.#name);
        }

        return this;
    }

    toString() {
        return `Flag[${this.name}]:${this.#state}`;
    }

    notify(onset, targetstate=true) {
        const fliphandler = (state, name) => (targetstate === state) && onset(state, name);
        return this.watch(fliphandler);
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

    get state() {
        return this.#state;
    }

    set state(newstate) {
        this.set(newstate);
    }

    get on() {
        return this.#state;
    }

    get off() {
        return ! this.#mutable;
    }

    [Symbol.toPrimitive](hint) {

        return (hint === 'string') ? String(this.#state)
             : (hint === 'number') ? +(this.#state)
             : this.#state;
      }
}

module.exports = Flag;