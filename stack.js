/**
 * @module stack
 */

'use strict';

const freeze = require('./freeze');

/**
 * Simple stack implementation. Return a stack object with four methods and one field:
 * 1. `push(...items)`: Push one or more items on the stack
 * 2. `pop()` : Pop a single item from the stack
 * 3. `peek()` : Return the item at the top of the stack without removing it from the stack
 * 4. `clear()` : Purge all remaining items from the stack
 * 5. `length`  : Return the number of items in the stack
 * 
 * These methods are not dependent on a `this` and so may be invoked independently of the returned stack object.
 * 
 * The stack will be initialized with the items in the *list* array.
 * 
 * The returned stack object is frozen. However, its methods are not dependent on a `this` and so may be invoked
 * independently of the returned stack object.
 *
 * @example
 * 
 * const stack = require('functionish/stack');
 * 
 * const foundation = stack( ['Hari Seldon', 'Salvor Hardin', 'Hober Mallow'] );
 * 
 * const { peek, push, pop, clear } = foundation;
 * 
 * pop(); // returns 'Hober Mallow';
 * peek(); // returns 'Salvor Hardin;
 * push( 'The Mule', 'Bel riose' );
 * foundation.length; // => 4
 * clear();
 * pop(); // returns `undefined`
 *  
 * @func stack
 * @param {any[]} list An array of items to initialize the stack with
 * @returns {object} A stack object
 */
module.exports = function stack(list) {

    list = list.slice();

    const stackinstance = {
        clear : function stackclear() { list.length = 0 },
        peek  : function stackpeek() { return list[ list.length - 1 ] },
        pop   : function stackpop() { return list.pop() },
        push  : function stackpush(...items) { list.push(...items) },
        get length() { return list.length }
    }

    freeze(stackinstance);

    return stackinstance;
}