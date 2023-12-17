/**
 * @module lib/HashSet
 * @ignore
*/
'use strict';

class HashSet extends Set {

    #hash = undefined;
    #itemmap = new Map();

    constructor(hashfunc, initialitems=[]) {
        
        super();
        
        this.#hash = hashfunc;

        for(const item of initialitems) this.#itemmap.set( hashfunc(item), item );
    }

    add(item) {
        this.#itemmap.set( this.#hash(item), item );
        return this;
    }

    clear() {
        this.#itemmap.clear();
    }

    delete(item) {
        return this.#itemmap.delete( this.#hash(item) );
    }

    *entries() {
        for(const value of this.#itemmap.values()) yield [value, value];
    }

    forEach(callback, thisarg) {
        for(const value of this.#itemmap.values()) callback.call(thisarg, value, value, this);
    }

    has(item) {
        return this.#itemmap.has( this.#hash(item) );
    }
    
    keys() {
        return this.#itemmap.values();
    }
    
    values() {
        return this.#itemmap.values();
    }
    
    get size() {
        return this.#itemmap.size;
    }

    [Symbol.iterator]() {
        return this.#itemmap.values();
    }
}

module.exports = HashSet;