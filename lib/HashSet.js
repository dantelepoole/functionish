/**
 * @module lib/HashSet
 * @ignore
*/
'use strict';

const ERROR_BAD_HASHFUNC = `functionish/HashSet(): The hashfunc argument has type %s. Expected a function.`;

const format = require('util').format;
const isfunction = require('../src/types/isfunction');
const typeorclassname = require('../src/types/typeorclassname');

class HashSet {

    #hash = undefined;
    #itemmap = new Map();

    constructor(hashfunc, initialitems=[]) {
        
        validatehashfunction(hashfunc);

        this.#hash = hashfunc;

        for(const item of initialitems) this.#itemmap.set( hashfunc(item), item );
    }

    add(item) {
        this.#itemmap.set( this.#hash(item), item );
        return this;
    }

    adduniq(item) {

        const hashkey = this.#hash(item);
        const keyexists = this.#itemmap.has(hashkey);

        keyexists || this.#itemmap.set(hashkey, item);

        return !keyexists;
    }

    clear() {
        this.#itemmap.clear();
        return this;
    }

    delete(item) {

        const key = this.#hash(item);
        return this.#itemmap.delete(key);
    }

    *entries() {
        for(const value of this.#itemmap.values()) yield [value, value];
    }

    forEach(callback, thisarg) {
        for(const value of this.#itemmap.values()) callback.call(thisarg, value, this);
        return this;
    }

    has(item) {

        const key = this.#hash(item);
        return this.#itemmap.has(key);
    }
    
    *keys() {
        yield* this.values();
    }

    get size() {
        return this.#itemmap.size;
    }

    *values() {
        for(const value of this.#itemmap.values()) yield value;
    }

    *[Symbol.iterator]() {
        yield* this.values();
    }
}

function validatehashfunction(hashfunc) {
    
    if( isfunction(hashfunc) ) return;

    const errormessage = format(ERROR_BAD_HASHFUNC, typeorclassname(hashfunc))
    throw new TypeError(errormessage);
}

module.exports = HashSet;