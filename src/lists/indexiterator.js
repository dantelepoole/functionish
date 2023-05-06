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
    #cursor;

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.#nextitem = { index:0, ...iterator.next() };
        this.#cursor = initcursor(this);
    }
    
    next() {

        const cursor = this.#cursor;
        
        if( !cursor.done ) {
            
            const currentitem = this.#nextitem;
            cursor.index = currentitem.index;
            cursor.done = currentitem.done;
            cursor.value = currentitem.value;
            
            if( !currentitem.done ) {
                
                const nextitem = this.#iterator.next();
                currentitem.index += 1;
                currentitem.done = nextitem.done;
                currentitem.value = nextitem.value;
            }
        }

        return cursor;
    }

    get cursor() {
        return this.#cursor;
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

function initcursor(iterator) {

    return {
        done  : false,
        index : -1,
        next  : () => !iterator.next().done,
        value : undefined,

        get hasvalue() { return !this.done }
    }
}

function raisebaditerable() {
    throw new TypeError(ERR_BAD_ITERABLE);
}

module.exports = indexiterator;