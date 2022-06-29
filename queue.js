/**
 * @module queue
 */

'use strict';

const NODE_NONE = undefined;

/**
 * Simple queue implementation. Return a queue object with four methods and one field:
 * 1. `enqueue(...items)`: Enqueue one or more items to the back of the queue
 * 2. `dequeue()` : Remove and return the item from the front of the queue
 * 3. `peek()` : Return the item at the front of the queue without removing it from the queue
 * 4. `clear()` : Purge all remaining items from the queue
 * 5. `length`  : Return the number of items in the queue
 * 
 * These methods are not dependent on a `this` and so may be invoked independently of the returned queue object.
 * 
 * The queue will be initialized with the items in the *initialitems* array.
 *
 * @example
 * 
 * const queue = require('functionish/queue');
 * 
 * const foundation = queue( 'Hari Seldon', 'Salvor Hardin', 'Hober Mallow' );
 * 
 * const { enqueue, dequeue, peek, clear } = foundation;
 * 
 * dequeue(); // returns 'Hari Seldon';
 * peek(); // returns 'Salvor Hardin;
 * enqueue( 'The Mule', 'Bel riose' );
 * foundation.length; // => 4
 * clear();
 * dequeue(); // returns `undefined`
 * 
 * @func queue
 * @param  {...any[]} [initialitems] The initial items to add to the queue
 * @returns {object} A queue object
 */
module.exports = function queue(...initialitems) {
    return createqueue(initialitems);
}

function createqueue(initialitems) {

    const nodelist = {
        head   : NODE_NONE,
        length : initialitems.length,
        tail   : NODE_NONE,
    }

    if(initialitems.length > 0) initializequeue(nodelist, initialitems);

    return {

        clear   : clear.bind(null, nodelist),
        dequeue : dequeue.bind(null, nodelist),
        enqueue : enqueue.bind(null, nodelist),
        peek    : peek.bind(null, nodelist),

        get length() {
            return nodelist.length;
        }
    }
}

function initializequeue(nodelist, initialitems) {

    const itemcount = initialitems.length;

    let node = nodelist.head = { value:initialitems[0], next:undefined }

    for(let i = 1; i < itemcount; i += 1) node = node.next = { value:initialitems[i], next:undefined }

    nodelist.tail = node;

}

function clear(nodelist) {
    nodelist.head = NODE_NONE;
    nodelist.tail = NODE_NONE;
    nodelist.length = 0;
}

function enqueue(nodelist, ...items) {

    for(let i = 0; i < items.length; i += 1) {

        if(nodelist.tail === NODE_NONE) nodelist.head = nodelist.tail = { value:items[i], next:NODE_NONE }
        else (nodelist.tail = nodelist.tail.next = {value:items[i], next:NODE_NONE })
    }

    nodelist.length += items.length;
}

function peek(nodelist) {
    return nodelist.head?.value;
}

function dequeue(nodelist) {

    if(nodelist.length === 0) return undefined;

    const value = nodelist.head.value;
    nodelist.head = nodelist.head.next;

    nodelist.length -= 1;

    if(nodelist.length === 0) nodelist.tail = nodelist.head = NODE_NONE;

    return value;
}