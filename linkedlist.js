/**
 * @module linkedlist
 */

'use strict';

const INDEX_NOT_FOUND = -1;
const NODE_EMPTY = undefined;

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
        slice       : partial(slice, nodelist),
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

    if(nodelist.head === NODE_EMPTY) nodelist.head = nodelist.tail;

    nodelist.length += 1;

    return nodelist.length;
}

function clear(nodelist) {

    nodelist.head = nodelist.tail = NODE_EMPTY;
    nodelist.length = 0;
}

function createnode(previousnode, value, nextnode=NODE_EMPTY) {

    const node = {
        next     : nextnode,
        previous : previousnode,
        value    : value
    }

    if( previousnode !== NODE_EMPTY ) previousnode.next = node;

    return node;
}

function createnodelist(initialvalues=[]) {

    const nodelist = {
        head   : NODE_EMPTY,
        length : 0,
        tail   : NODE_EMPTY
    }

    const stubnode = {};
    let node = stubnode;
    let nodecount = 0;

    for(const value of initialvalues) {
        node = createnode(node, value);
        nodecount += 1;
    }

    if( nodecount > 0 ) {
        nodelist.length = nodecount;
        nodelist.tail = node;
        nodelist.head = stubnode.next;
        nodelist.head.previous = NODE_EMPTY;
    }

    return nodelist;
}

function filter(nodelist, predicate) {

    function* filteriterate() {

        let node = { next:nodelist.head }

        while( (node = node.next) !== NODE_EMPTY ) if( predicate(node.value) ) yield node.value;
    }

    return linkedlist(filteriterate());

}

function findnode(nodelist, predicate) {

    let node = { next:nodelist.head }

    while( (node = node.next) !== NODE_EMPTY ) if( predicate(node.value) ) break;

    return node;
}

function findindex(nodelist, predicate) {

    let node = { next:nodelist.head };
    let index = 0;

    while( (node = node.next) !== NODE_EMPTY ) {
        if( predicate(node.value) ) return index;
        index += 1;
    }

    return INDEX_NOT_FOUND;
}

function getnode(nodelist, index) {

    if( index < 0 ) index = (nodelist.length + index);

    if( index < 0 || index > nodelist.length ) return undefined;

    let node = { next:nodelist.head }

    while( (node = node.next) !== NODE_EMPTY && index > 0 ) index -= 1;

    return node;
}

function getnodelistiterator(nodelist) {

    let node = { next:nodelist.head }

    return {
        next() {
            return ((node = node?.next) === NODE_EMPTY) ? {done:true} : { done:false, value:node.value }
        }
    }
}

function insert(nodelist, node, value) {

    node = (typeof node === 'number') ? lookupnode(nodelist, node) : (node ?? nodelist.tail);
    
    const newnode = insertnode(node?.previous, {value}, node);

    if( nodelist.head === node ) nodelist.head = newnode;
    if( nodelist.tail === NODE_EMPTY ) nodelist.tail = nodelist.head;

    nodelist.length += 1;

    return nodelist.length;
}

function insertnode(previousnode, node, nextnode) {

    node.previous = previousnode ?? nextnode?.previous;
    node.next = nextnode ?? previousnode?.next;

    if( node.previous ) node.previous.next = node;
    if( node.next ) node.next.previous = node;

    return node;
}

function lookupnode(nodelist, index) {

    const node = getnode(nodelist, index);
    
    if( node !== NODE_EMPTY ) return node;

    const error = new Error(`linkedlist: node ${index} not found`);
    error.name = 'NodeNotFoundError';

    return error;
}

function map(nodelist, mapfunc) {

    function* mapiterate() {

        let node = { next:nodelist.head }

        while( (node = node.next) !== NODE_EMPTY ) yield mapfunc(node.value);

    }

    return linkedlist(mapiterate());
}

function reduce(nodelist, reducer, initialvalue) {

    let accumulator = initialvalue;
    let node = { next:nodelist.head }

    while( (node = node.next) !== NODE_EMPTY ) accumulator = reducer(accumulator, node.value);

    return accumulator;
}

function remove(nodelist, node) {

    if( typeof node === 'number' ) node = lookupnode(nodelist, node);

    if( node === NODE_EMPTY ) return nodelist.length;

    if( nodelist.head === node ) nodelist.head = node.next;
    if( nodelist.tail === node ) nodelist.tail = node.previous;

    if( node.next !== NODE_EMPTY ) node.next.previous = node.previous;
    if( node.previous !== NODE_EMPTY ) node.previous.next = node.next;
    
    node.next = node.previous = NODE_EMPTY;

    nodelist.length -= 1;

    return nodelist.length;
}

function reverse(nodelist) {

    if( nodelist.length === 0 ) return linkedlist();

    const flippednodelist = createnodelist();

    let node = nodelist.tail;
    let flippednode = flippednodelist.head = createnode(NODE_EMPTY, node.value, node.previous);

    while( (node = node.previous) !== NODE_EMPTY ) flippednode = createnode(flippednode, node.value);

    flippednodelist.tail = flippednode;
    flippednodelist.length = nodelist.length;

    return linkedlistfromnodes(flippednodelist);
}

function slice(nodelist, startindex=0, endindex=undefined) {

    endindex = (endindex ?? nodelist.length);

    if( startindex < 0 ) startindex = nodelist.length + startindex;
    if( endindex < 0 ) endindex = nodelist.length + endindex;

    let nodecount = (endindex - startindex);
    let node = getnode(nodelist, startindex);
    if( node === NODE_EMPTY || nodecount <= 0 ) return linkedlist();

    const slicenodelist = createnodelist();
    let slicenode = slicenodelist.head = createnode(NODE_EMPTY, node.value);
    slicenodelist.length = 1;

    while( slicenodelist.length < nodecount && (node = node.next) !== NODE_EMPTY ) {
        slicenode = createnode(slicenode, node.value);
        slicenodelist.length += 1;
    }

    slicenodelist.tail = slicenode;

    return linkedlistfromnodes(slicenodelist);
}

function toarray(nodelist) {

    function* nodelistiterate() {

        let node = { next:nodelist.head }

        while( (node = node.next) !== NODE_EMPTY ) yield node.value;

    }

    return Array.from( nodelistiterate() );
}