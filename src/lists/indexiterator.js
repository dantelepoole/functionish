/**
 * @module lib/indexiterator
 * @ignore
 */

'use strict';

const ERR_BAD_ITERABLE = `IndexIterator: Expected an iterable or iterator object or a generator function.`;

const isfunction = func => (typeof func === 'function');
const isiterable = iterable => isfunction( iterable[Symbol.iterator] );
const isiterator = iterator => isfunction(iterator?.next);
const raisebaditerable = () => { throw new TypeError(ERR_BAD_ITERABLE) }

class IndexIterator {

    #iterator;
    #nextitem = { index:0 }

    constructor(iterator) {
        
        this.#iterator = iterator;
        
        const nextitem = iterator.next();
        this.#nextitem.done = nextitem.done;
        this.#nextitem.value = nextitem.value;
    }
    
    #updatenextitem() {

        const nextitem = this.#iterator.next();
        this.#nextitem.done = nextitem.done;
        this.#nextitem.value = nextitem.value;
        
        this.#nextitem.index += 1;
    }

    next() {

        const currentitem = { ...this.#nextitem }
        
        currentitem.done || this.#updatenextitem();

        return currentitem;
    }

    nextvalue() {
        return this.next().value;
    }

    get done() {
        return !!this.#nextitem.done
    }

    get hasnext() {
        return !this.#nextitem.done;
    }

    get count() {
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
                   : isfunction(source) ? source()
                   : raisebaditerable();

    return new IndexIterator(iterator);
}

module.exports = indexiterator;