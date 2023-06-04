/**
 * @module lib/listiterator
 * @ignore
 */

'use strict';

const ERR_BAD_ITERABLE = `listiterator(): Expected an iterable or iterator object or a function.`;

const isfunction = func => (typeof func === 'function');
const isiterable = iterable => isfunction( iterable[Symbol.iterator] );
const isiterator = iterator => isfunction(iterator.next);
const raisebaditerable = () => { throw new TypeError(ERR_BAD_ITERABLE) }

class ListIterator {

    #iterator;
    #count = 0;
    #nextitem = { done:false }

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.next();

    }
    
    next() {

        if( this.#nextitem.done ) return this.#nextitem;

        const currentitem = this.#nextitem;
        
        const {done, value} = this.#iterator.next();
        this.#nextitem = { done, value, index:this.#count }
        
        done || (this.#count += 1);

        return currentitem;
    }

    get done() {
        return this.#nextitem.done
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
 * @example <caption>Example usage of `listiterator()`</caption>
 * 
 * to do
 * 
 * @function listiterator
 * @param {iterable} source The iterable object to get an iterator for 
 * @returns {iterator}
 */
function listiterator(source) {

    const iterator = isiterable(source) ? source[Symbol.iterator]()
                   : isiterator(source) ? source
                   : isfunction(source) ? source()
                   : raisebaditerable();

    return new ListIterator(iterator);
}

module.exports = listiterator;