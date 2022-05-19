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
        list : createitemlist()
    }

    return {

        clear   : partial(clear, q),
        dequeue : partial(dequeue, q),
        enqueue : partial(enqueue, q),
        peek    : partial(peek, q),

        get length() {
            return (q.list.tailindex - q.list.headindex);
        }
    }
}

function clear(q) {
    q.list = createitemlist();
}

function createitemlist() {

    return {
        headindex : 0,
        tailindex : 0
    }
}

function enqueue(q, ...items) {

    if( items.length === 0 ) return;
    
    const list = q.list;
    let tailindex = list.tailindex;

    for( const item of items ) {
        list[tailindex] = item;
        tailindex += 1;
    }

    list.tailindex = tailindex;
}

function peek(q) {
    return q.list[q.list.headindex];
}

function dequeue(q) {

    const list = q.list;

    if( list.headindex === list.tailindex) return undefined;

    const itemindex = list.headindex;
    const item = list[itemindex];
    delete list[itemindex];
    
    list.headindex += 1;

    if(list.headindex === list.tailindex) q.list = createitemlist();
    
    return item;
}

function checkarray(list) {

    if( isarray(list) ) return list;
    
    throw new TypeError(`queue(): the argument is not an array (${classname(list)})`);
}