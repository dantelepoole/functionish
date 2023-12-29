/**
 * @module lists/lookaheaditerator
 */

'use strict';

const iterator = require('./iterator');

class LookAheadIterator {

    #iterator;
    #nextitem;
    #count = 0;

    constructor(iterator) {
        
        this.#iterator = iterator;
        this.#nextitem = iterator.next();
    }
    
    next() {

        this.#nextitem.done || (this.#count += 1);
        
        const currentitem = this.#nextitem;

        this.#nextitem = this.#iterator.next();

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
 * Return an enhanced iterator object that iterates over the items produced by *iterable*.
 * 
 * In addition to the standard `next()` method, the iterator object has the following properties:
 * 
 * `peek()` : Return the next object that the following call to `next()` will return, but without actually iterating
 *            over it. Consecutive calls to `peek()` will return the same object, as will a subsequent call to
 *            `next()`. 
 * `done`   : Return boolean `true` if there are no more items to iterate over, or boolean `false` if the iteration
 *            is not yet completed.
 * `hasnext`: Opposite of `done`.
 * `count`  : The zero-based index of the next item object that the following call to `next()` will return. After the
 *            iteration is complete, this property holds the total number of items produced by the iterable.
 * 
 * The enhanced iterator object is itself iterable. It's `@@iterator` method will return itself.
 * 
 * @example <caption>Example usage of `lookaheaditerator()`</caption>
 * 
 * const { lookaheaditerator } = require('functionish');
 * 
 * const iter = lookaheaditerator( [1,2,3] );
 * 
 * iter.done; // false
 * iter.hasnext; // true
 * iter.peek(); // { done:false, value:1 }
 * 
 * while( iter.hasnext ) {
 *     console.log(iter.count, iter.next().value);
 * }
 * 
 * // prints:
 * //     0 1
 * //     1 2
 * //     2 3
 * 
 * @function lookaheaditerator
 * @param {iterable} iterable The iterable object to get an iterator for 
 * @returns {iterator}
 */
function lookaheaditerator(iterable) {
    return new LookAheadIterator( iterator(iterable) );
}

module.exports = lookaheaditerator;