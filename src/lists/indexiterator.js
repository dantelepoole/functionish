/**
 * @module lib/indexiterator
 * @ignore
 */

'use strict';

const ERR_BAD_ITERABLE = `IndexIterator: Expected an iterable or iterator object or a generator function.`;

const isfunction = func => (typeof func === 'function');
const isobject = obj => (typeof obj === 'object' && (obj !== null) );

const isgeneratorfunction = require('util').types.isGeneratorFunction;

const isiterable = list => isfunction( list[Symbol.iterator] );
const isiterator = iterator => isobject(iterator) && isfunction(iterator.next);

class IndexIterator {

    #iterator;
    #nextitem;

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.#nextitem = { index:0, ...iterator.next() }
    }

    next() {

        if( this.#nextitem.done ) return this.#nextitem;

        const item = this.#nextitem;
        this.#nextitem = { index:item.index+1, ...this.#iterator.next() }

        return item;
    }

    get done() {
        return this.#nextitem.done
    }

    get hasnext() {
        return !this.#nextitem.done;
    }

    get itemcount() {
        return this.#nextitem.index;
    }
}

/**
 * to do
 * 
 * @example <caption>Example usage of `indexiterator()`</caption>
 * 
 * to do
 * 
 * @function indexiterator
 * @param {iterable} source The iterable object to get an iterator for 
 * @returns {iterator}
 */
function indexiterator(source) {

    const iterator = isiterable(source) ? source[Symbol.iterator]()
                   : isiterator(source) ? source
                   : isgeneratorfunction(source) ? source()
                   : raisebaditerable();

    return new IndexIterator(iterator);
}

function raisebaditerable() {
    throw new TypeError(ERR_BAD_ITERABLE);
}

module.exports = indexiterator;