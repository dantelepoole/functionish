/**
 * @module stack
 */

'use strict';

const STACK_CLASSNAME = 'Stack';

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
 * @param {any[]} [list] An array of items to initialize the stack with
 * @returns {object} A stack object
 * @throws {TypeError} if *list* is not an array
 */
module.exports = function stack(...initialitems) {

    const nodes = { head:undefined, length:0 }

    if(initialitems.length > 0) {

        for(const item of initialitems) nodes.head = { next:nodes.head, value:item }

        nodes.length += initialitems.length;
    }

    return {
        
        clear : () => (nodes.length = 0, nodes.head = undefined),
        
        peek  : () => nodes.head?.value,
        
        pop   : () => {

            if(nodes.length === 0) return undefined;
            
            const value = nodes.head.value;
            nodes.head = nodes.head.next;
            
            nodes.length -= 1;

            return value;
        },
        
        push(...items) {

            for(const item of items) nodes.head = { next:nodes.head, value:item };
            
            nodes.length += items.length;
        },

        get length() { return nodes.length },

        get [Symbol.toStringTag]() { return STACK_CLASSNAME }
    }
}
