/**
 * @module lists/lookaheaditerator
 */

'use strict';

const ERR_BAD_SOURCE = `functionish/lists/lookaheaditerator(): The source argument has type %s. Expected an iterable or iterator object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const isiterable = source => isfunction(source?.[Symbol.iterator]);
const isiterator = source => isfunction(source?.next);

const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);

class LookAheadIterator {

    #iterator;
    #nextitem;
    #count = 0;

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.#nextitem = iterator.next();

    }
    
    #advanceiterator() {

        this.#nextitem = this.#iterator.next();
        this.#count += 1;
    }

    next() {

        const currentitem = this.#nextitem;

        currentitem.done || this.#advanceiterator();

        return currentitem;
    }

    peek() {
        return this.#nextitem;
    }

    get done() {
        return !! this.#nextitem.done
    }

    get hasnext() {
        return ! this.#nextitem.done;
    }

    get count() {
        return this.#count;
    }

    [Symbol.iterator]() {
        return this;
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
                   : raisebadsource(source);

    return new LookAheadIterator(iterator);
}

module.exports = lookaheaditerator;