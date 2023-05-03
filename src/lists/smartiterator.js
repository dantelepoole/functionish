/**
 * @module lists/smartiterator
 */

'use strict';

class SmartIterator {

    #iterator = undefined;
    #nextitem = undefined;

    constructor(iterator) {
        this.#iterator = iterator;
        this.#nextitem = iterator.next();
    }

    get done() {
        return this.#nextitem.done;
    }

    get hasnext() {
        return !this.#nextitem.done;
    }

    next() {

        const item = this.#nextitem;

        if( !item.done ) this.#nextitem = this.#iterator.next();

        return item;
    }

    *[Symbol.iterator]() {

        while( !this.#nextitem.done ) {

            const value = this.#nextitem.value;
            
            this.#nextitem = this.#iterator.next();

            yield value;
        }

        return this.#nextitem.value;
    }
}

/**
 * to do
 * 
 * @example <caption>Example usage of `smartiterator()`</caption>
 * 
 * to do
 * 
 * @function smartiterator
 * @param {iterable} list The iterable object to get an iterator for 
 * @returns {iterator}
 */
function smartiterator(list) {
    return new SmartIterator( list[Symbol.iterator]() );
}

module.exports = smartiterator;