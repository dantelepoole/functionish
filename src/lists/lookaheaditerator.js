/**
 * @module lib/lookaheaditerator
 * @ignore
 */

'use strict';

const ERR_BAD_ITERABLE = `lookaheaditerator(): Expected an iterable object, an iterator object or a function.`;

const isfunction = require('../types/isfunction');

const isiterable = iterable => isfunction( iterable[Symbol.iterator] );
const isiterator = iterator => isfunction(iterator.next);
const raisebaditerable = () => { throw new TypeError(ERR_BAD_ITERABLE) }

class LookAheadIterator {

    #iterator;
    #nextitem = { index:-1 };

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.#updatenextitem();

    }
    
    #updatenextitem() {

        const item = this.#iterator.next();

        this.#nextitem = {
            done  : !! item.done,
            value : item.value,
            index : this.#nextitem.index + 1
        }

    }

    next() {

        const currentitem = this.#nextitem;
        
        if( !currentitem.done ) this.#updatenextitem();

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
 * @example <caption>Example usage of `lookaheaditerator()`</caption>
 * 
 * to do
 * 
 * @function lookaheaditerator
 * @param {iterable} source The iterable object to get an iterator for 
 * @returns {iterator}
 */
function lookaheaditerator(source) {

    const iterator = isiterable(source) ? source[Symbol.iterator]()
                   : isiterator(source) ? source
                   : isfunction(source) ? source()
                   : raisebaditerable();

    return new LookAheadIterator(iterator);
}

module.exports = lookaheaditerator;