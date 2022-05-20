/**
 * @module queue
 */

'use strict';

const classname = require('./classname');
const hasitems = require('./hasitems');
const isarray = require('./isarray');
const partial = require('./partial');

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
 * const foundation = queue( ['Hari Seldon', 'Salvor Hardin', 'Hober Mallow'] );
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
 * @param  {any[]} [initialitems] The initial items to add to the queue
 * @returns {object} A queue object
 */
module.exports = function queue(initialitems=[]) {

    checkarray(initialitems);

    const queue = createqueue();

    hasitems(initialitems) && queue.enqueue(...initialitems);

    return queue;
}

function createqueue() {

    const q = {
        headindex : 0,
        itemlist  : {},
        tailindex : 0
    }

    return {

        clear   : partial(clear, q),
        dequeue : partial(dequeue, q),
        enqueue : partial(enqueue, q),
        peek    : partial(peek, q),

        get length() {
            return (q.tailindex - q.headindex);
        }
    }
}

function clear(q) {
    q.itemlist = {};
    q.headindex = q.tailindex = 0;
}

function enqueue(q, ...items) {

    for(let index = 0; index < items.length; index++) q.itemlist[q.tailindex+index] = items[index];

    q.tailindex += items.length;
}

function peek(q) {
    return q.itemlist[q.headindex];
}

function dequeue(q) {

    if(q.headindex === q.tailindex) return undefined;
    
    const item = q.itemlist[q.headindex];
    delete q.itemlist[q.headindex];
    
    q.headindex += 1;

    if(q.headindex === q.tailindex) clear(q);

    return item;
}

function checkarray(list) {

    if( isarray(list) ) return list;
    
    throw new TypeError(`queue(): the argument is not an array (${classname(list)})`);
}