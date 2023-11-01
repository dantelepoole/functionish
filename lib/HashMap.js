/**
 * @module lib/HashMap
 * @ignore
*/
'use strict';

const ERROR_BAD_HASHFUNC = `functionish/HasMap(): The hashfunc argument has type %s. Expected a function.`;
const INDEX_KEY = 0;
const INDEX_VALUE = 1;

const format = require('util').format;
const isfunction = require('../src/types/isfunction');
const typeorclassname = require('../src/types/typeorclassname');

class HashMap {

    #hash = undefined;
    #itemmap = new Map();

    constructor(hashfunc, initialentries=[]) {
        
        validatehashfunction(hashfunc);

        this.#hash = hashfunc;

        for(const entry of initialentries) this.#itemmap.set( hashfunc(entry[INDEX_KEY]), entry );
    }

    set(key, value) {
        this.#itemmap.set( this.#hash(key), [key,value]);
        return this;
    }

    setuniq(key, value) {

        const hashkey = this.#hash(key);
        const keyexists = this.#itemmap.has(hashkey);

        keyexists || this.#itemmap.set(hashkey, [key,value]);

        return !keyexists;
    }

    clear() {
        this.#itemmap.clear();
        return this;
    }

    delete(key) {
        return this.#itemmap.delete( this.#hash(key) );
    }

    *entries() {
        yield* this.#itemmap.values();
    }

    forEach(callback, thisarg) {
        for(const entry of this.#itemmap.values()) callback.call(thisarg, entry, this);
        return this;
    }

    get(key) {
        return this.#itemmap.get( this.#hash(key) )?.[INDEX_VALUE];
    }

    has(key) {
        return this.#itemmap.has( this.#hash(key) );
    }
    
    *keys() {
        for(const entry of this.#itemmap.values()) yield entry[INDEX_KEY];
    }

    get size() {
        return this.#itemmap.size;
    }

    *values() {
        for(const entry of this.#itemmap.values()) yield entry[INDEX_VALUE];
    }

    *[Symbol.iterator]() {
        yield* this.entries();
    }
}

function validatehashfunction(hashfunc) {

    if( isfunction(hashfunc) ) return;

    throw new TypeError( format(ERROR_BAD_HASHFUNC, typeorclassname(hashfunc)) );
}

module.exports = HashMap;