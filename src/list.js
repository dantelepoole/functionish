/**
 * @module list 
 */
'use strict';

const isiterable = require('./isiterable');

/**
 * Return an iterable object that produces the *items* in order. If an *item* itself is iterable, its items are
 * injected individually, to a maximum recursion of 1.
 * 
 * @example
 * 
 * const list = require('functionish/list');
 * 
 * list(1,2,3); // returns an iterable that produces 1, 2 and 3
 * 
 * list([1,2,3]); // returns an iterable that produces 1, 2 and 3
 * 
 * list(1,2,[3,4,5]); //returns an iterable that produces 1,2,3,4 and 5
 * 
 * list(1,2,[[3,4,5]]); // returns an iterable that produces 1,2 and [3,4,5]
 * 
 * @func list
 * @param {...any[]} items The items to list
 * @returns {iterable}
 */
module.exports = function list(...items) {

    return {
        [Symbol.iterator] : function* () {

            for(const item of items) {

                if( isiterable(item) ) yield* item;
                else yield item;
            }
        }
    }
}
