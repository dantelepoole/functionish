/**
 * @module lib/HashMap
 * @ignore
*/
'use strict';

const ERROR_BAD_HASHFUNC = `The hashfunc argument has type %s. Expected a function.`;
const INDEX_KEY = 0;
const INDEX_VALUE = 1;
const TYPE_FUNCTION = 'function';

const format = require('util').format;

const entryadder = (hashfunc, map) => entry => map.set( hashfunc(entry[INDEX_KEY]), entry );

class HashMap {

    #hash = null;
    #itemmap = new Map();

    constructor(hashfunc, initialentries) {
        
        validatehashfunction(hashfunc);

        this.#hash = hashfunc;

        if(initialentries) {
            const addentry = entryadder(hashfunc, this.#itemmap);
            for(const entry of initialentries) addentry(entry);
        }
    }

    set(key, value) {
        this.#itemmap.set( this.#hash(key), [key,value]);
        return this;
    }

    setuniq(key, value) {

        const previoussize = this.#itemmap.size;
        
        this.#itemmap.set( this.#hash(key), [key,value]);

        return (previoussize < this.#itemmap.size);
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
        for(const entry of this.#itemmap.values()) callback.call(thisarg, entry[INDEX_KEY], entry[INDEX_VALUE], this);
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
    if(typeof hashfunc !== TYPE_FUNCTION) throw new TYPE_FUNCTION( format(ERROR_BAD_HASHFUNC, typeof hashfunc) );
}

module.exports = HashMap;