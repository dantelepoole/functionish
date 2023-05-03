/**
 * @module lib/HashSet
 * @ignore
*/
'use strict';

const ERROR_BAD_HASHFUNC = `The hashfunc argument has type %s. Expected a function.`;
const TYPE_FUNCTION = 'function';

const format = require('util').format;
const itemadder = (itemmap, hashfunc) => item => itemmap.set( hashfunc(item), item );

class HashSet {

    #hash = null;
    #itemmap = new Map();

    constructor(hashfunc, initialitems) {
        
        validatehashfunction(hashfunc);

        this.#hash = hashfunc;

        if(initialitems) {
            const additem = itemadder(this.#itemmap, hashfunc);
            for(const item of initialitems) additem(item);
        }
    }

    add(item) {

        const key = this.#hash(item);
        this.#itemmap.set(key, item);

        return this;
    }

    adduniq(item) {

        const previoussize = this.#itemmap.size;
        
        const key = this.#hash(item);
        this.#itemmap.set(key, item);

        return (previoussize < this.#itemmap.size);
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
        for(const value of this.#itemmap.values()) callback.call(thisarg, value, value, this);
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
    if(typeof hashfunc !== TYPE_FUNCTION) throw new TYPE_FUNCTION( format(ERROR_BAD_HASHFUNC, typeof hashfunc) );
}

module.exports = HashSet;