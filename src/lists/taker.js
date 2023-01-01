/**
 * @module lists/taker
 */

'use strict';

/**
 * Return a function that repeatedly returns a specified number of successive items from *list*. When
 * all items have been taken, an empty array is returned.
 * 
 * The number of items to take can be passed on each call (default: 1);
 * 
 * @example
 * const taker = require('functionish/lists/taker');
 * 
 * const getnext = taker( [1,2,3,4,5] );
 * 
 * getnext(); // returns [1]
 * getnext(); // returns [2]
 * getnext(3); // returns [3,4,5]
 * getnext(); // returns []
 * 
 * @function taker
 * @param {iterable} list The list of items
 * @returns {function}
 */
module.exports = function taker(list) {

    let iterator = list[Symbol.iterator]();

    return function(itemcount=1) {

        (itemcount >= 0) || (itemcount = 0);
        
        return [ ...take(itemcount, iterator) ];
    }
}

function* take(itemcount, iterator) {

    while(itemcount > 0) {

        itemcount -= 1;

        const {done, value} = iterator.next();

        if(done) return;

        yield value;
    }
}