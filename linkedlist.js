/**
 * @module linkedlist
 */

'use strict';

const INDEX_NOT_FOUND = -1;
const NODE_NONE = undefined;

const partial = require('./partial');

module.exports = linkedlist;

function linkedlist(initialitems=[]) {

    return linkedlistfromnodes(
        createnodelist(initialitems)
    )
}

function linkedlistfromnodes(nodelist) {

    return {
        add         : partial(add, nodelist),
        at          : partial(at, nodelist),
        clear       : partial(clear, nodelist),
        filter      : partial(filter, nodelist),
        findnode    : partial(findnode, nodelist),
        findindex   : partial(findindex, nodelist),
        getnode     : partial(getnode, nodelist),
        insert      : partial(insert, nodelist),
        map         : partial(map, nodelist),
        reduce      : partial(reduce, nodelist),
        remove      : partial(remove, nodelist),
        reverse     : partial(reverse, nodelist),
        toarray     : partial(toarray, nodelist),

        get head() { return nodelist.head },
        get length() { return nodelist.length },
        get tail() { return nodelist.tail },

        [Symbol.iterator]() {
            return getnodelistiterator(nodelist);
        }
    }
}

function add(nodelist, value) {

    nodelist.tail = createnode(nodelist.tail, value);

    nodelist.length += 1;

    return nodelist.length;
}

function at(nodelist, index) {
    return getnode(nodelist, index)?.value;
}

function clear(nodelist) {

    nodelist.head = nodelist.tail = NODE_NONE;
    nodelist.length = 0;
}

function createnode(previousnode, value) {

    const node = Object.create(null);

    node.previous = previousnode;
    node.value = value;

    previousnode.next = node;

    return node;
}

function createnodelist(initialvalues=[]) {

    const nodelist = {
        head   : NODE_NONE,
        length : 0,
        tail   : NODE_NONE
    }

    const stubnode = {};
    let currentnode = stubnode;
    let nodecount = 0;

    for(const value of initialvalues) {
        currentnode = createnode(currentnode, value);
        nodecount += 1;
    }

    if( nodecount > 0 ) {
        nodelist.length = nodecount;
        nodelist.tail = currentnode;
        nodelist.head = stubnode.next;
        nodelist.head.previous = NODE_NONE;
    }

    return nodelist;
}

function filter(nodelist, predicate) {

    function* filteriterate() {
        
        let currentnode = nodelist.head;

        while(currentnode !== NODE_NONE) {
            if( predicate(currentnode.value) ) yield currentnode.value;
            currentnode = currentnode.next;
        }
    }

    return linkedlist(filteriterate());

}

function findnode(nodelist, predicate) {
    
    let currentnode = nodelist.head;

    while( currentnode !== NODE_NONE ) {
        if( predicate(currentnode.value) ) return currentnode;
        currentnode = currentnode.next;
    }

    return NODE_NONE;
}

function findindex(nodelist, predicate) {

    let currentnode = nodelist.head;
    let index = 0;

    while( currentnode !== NODE_NONE ) {
        if( predicate(currentnode.value) ) return index;
        currentnode = currentnode.next;
        index += 1;
    }

    return INDEX_NOT_FOUND;
}

function getnode(nodelist, index) {

    if( index < 0 ) index = (nodelist.length + index);

    let currentnode = nodelist.head;

    while( index > 0 && currentnode !== NODE_NONE ) {
        currentnode = currentnode.next;
        index -= 1;
    }

    return (index === 0) ? currentnode : NODE_NONE;
}

function getnodelistiterator(nodelist) {

    let currentnode = { next:nodelist.head }

    return {
        next() {
            currentnode = currentnode?.next;
            return (currentnode === NODE_NONE) ? {done:true} : { done:false, value:currentnode.value }
        }
    }
}

function insert(nodelist, targetnode, value) {

    if( typeof targetnode === 'number' ) {
        const index = targetnode;
        targetnode = getnode(nodelist, index);
        if( targetnode === NODE_NONE ) raiseindexnotfounderror(index, 'linkedlist.insert()');
    }

    if( targetnode === NODE_NONE ) targetnode = nodelist.tail;
    
    const newnode = insertnode(targetnode?.previous, {value}, targetnode);

    if( nodelist.head === targetnode ) nodelist.head = newnode;
    if( nodelist.tail === NODE_NONE ) nodelist.tail = nodelist.head;

    nodelist.length += 1;

    return nodelist.length;
}

function insertnode(previousnode, newnode, nextnode) {

    newnode.previous = previousnode ?? nextnode?.previous;
    newnode.next = nextnode ?? previousnode?.next;

    if( newnode.previous ) newnode.previous.next = newnode;
    if( newnode.next ) newnode.next.previous = newnode;

    return newnode;
}

function map(nodelist, mapfunc) {

    function* mapiterate() {
        
        let currentnode = nodelist.head;

        while(currentnode !== NODE_NONE) {
            yield mapfunc(currentnode.value);
            currentnode = currentnode.next;
        }
    }

    return linkedlist(mapiterate());
}

function raiseindexnotfounderror(index, source) {

    const errormessage = `${source}: index ${index} not found`;

    const error = new Error(errormessage);
    error.name = 'IndexNotFoundError';

    throw error;
}

function reduce(nodelist, reducer, initialvalue) {

    let accumulator = initialvalue;
    let currentnode = nodelist.head;

    while( currentnode !== NODE_NONE ) {
        accumulator = reducer(accumulator, currentnode.value);
        currentnode = currentnode.next;
    }

    return accumulator;
}

function remove(nodelist, targetnode) {

    if( typeof targetnode === 'number' ) {
        const index = targetnode;
        targetnode = getnode(nodelist, index);
        if( targetnode === NODE_NONE ) raiseindexnotfounderror(index,'linkedlist.remove()');
    }

    const nextnode = targetnode?.next;
    const previousnode = targetnode?.previous;

    if( nextnode === NODE_NONE && previousnode === NODE_NONE ) return nodelist;

    targetnode.next = targetnode.previous = undefined;

    if( nextnode !== NODE_NONE ) nextnode.previous = previousnode;
    if( previousnode !== NODE_NONE ) previousnode.next = nextnode;

    if( nodelist.head === targetnode ) nodelist.head = nextnode;
    if( nodelist.tail === targetnode ) nodelist.tail = previousnode;

    nodelist.length -= 1;

    return targetnode?.value;
}

function reverse(nodelist) {

    if( nodelist.length === 0 ) return linkedlist();

    const newlist = createnodelist();

    let currentnode = nodelist.tail;
    let reversednode = { next:currentnode.previous, previous:currentnode.next, value:currentnode.value }

    newlist.head = reversednode;

    while(currentnode.previous !== NODE_NONE) {

        currentnode = currentnode.previous;
        reversednode = createnode(reversednode, currentnode.value);

    }

    newlist.tail = reversednode;
    newlist.length = nodelist.length;

    return linkedlistfromnodes(newlist);
}

function toarray(nodelist) {

    function* nodelistiterate() {

        let currentnode = nodelist.head;

        while(currentnode !== NODE_NONE) {
            yield currentnode.value;
            currentnode = currentnode.next;
        }
    }

    return Array.from( nodelistiterate() );
}