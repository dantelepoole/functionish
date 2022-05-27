/**
 * @module linkedlist
 */

'use strict';

const INDEX_NOT_FOUND = -1;
const NODE_NONE = undefined;

const partial = require('./partial');

module.exports = linkedlist;

function linkedlist(initialitems=[]) {

    const nodelist = createnodelist(initialitems);
    return linkedlistfromnodes(nodelist);
}

function linkedlistfromnodes(nodelist) {

    return {

        at         : partial(at, nodelist),
        findnode   : partial(findnode, nodelist),
        findindex  : partial(findindex, nodelist),
        getnode    : partial(getnode, nodelist),
        insert     : partial(insert, nodelist),
        insertmany : partial(insertmany, nodelist),
        peek       : partial(peek, nodelist),
        pop        : partial(pop, nodelist),
        push       : partial(push, nodelist),
        pushmany   : partial(pushmany, nodelist),
        remove     : partial(removenode, nodelist),
        reverse    : partial(reverse, nodelist),

        get head() { return nodelist.head },
        get length() { return nodelist.length },
        get tail() { return nodelist.tail },

        [Symbol.iterator]() {
            return getnodelistiterator(nodelist);
        }
    }
}

function at(llist, index) {
    return getnode(llist, index)?.value;
}

function createnode(previousnode, value) {

    const node = Object.create(null);

    node.previous = previousnode;
    node.value = value;

    previousnode.next = node;

    return node;
}

function createnodelist(initialvalues) {

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

function findnode(llist, predicate) {
    
    let currentnode = llist.head;

    while( currentnode !== NODE_NONE ) {
        if( predicate(currentnode.value) ) return currentnode;
        currentnode = currentnode.next;
    }

    return NODE_NONE;
}

function findindex(llist, predicate) {

    let currentnode = llist.head;
    let index = 0;

    while( currentnode !== NODE_NONE ) {
        if( predicate(currentnode) ) return index;
        currentnode = currentnode.next;
        index += 1;
    }

    return INDEX_NOT_FOUND;
}

function getnode(llist, index) {

    if( index < 0 ) index = (llist.length + index);

    let currentnode = llist.head;

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
            if( currentnode.next === NODE_NONE ) return { done:true }

            currentnode = currentnode.next;
            return { done:false, value:currentnode.value }
        }
    }
}

function getnodelistreverseiterator(nodelist) {

    let currentnode = { previous:nodelist.tail }

    return {
        next() {
            if( currentnode.previous === NODE_NONE ) return { done:true }
            
            currentnode = currentnode.previous;
            return { done:false, value:currentnode.value }
        }
    }
}

function insert(llist, targetnode, value) {

    const newnode = insertnode(targetnode?.previous, {value}, targetnode);

    if( llist.head === targetnode ) llist.head = newnode;
    if( llist.tail === NODE_NONE ) llist.tail = llist.head;

    llist.length += 1;

    return llist.length;
}

function insertnode(previousnode, newnode, nextnode) {

    newnode.previous = previousnode ?? nextnode?.previous;
    newnode.next = nextnode ?? previousnode?.next;

    if( newnode.previous ) newnode.previous.next = newnode;
    if( newnode.next ) newnode.next.previous = newnode;

    return newnode;
}

function insertnodelist(previousnode, newnodes, nextnode) {

    if( newnodes.length === 0 ) return newnodes;

    const headnode = newnodes.head;
    const tailnode = newsnodes.tail;

    headnode.previous = previousnode ?? nextnode?.previous;
    tailnode.next = nextnode ?? previousnode?.next;

    if( headnode.previous ) headnode.previous.next = headnode;
    if( tailnode.next ) tailnode.next.previous = tailnode;

    return newnodes;
}

function insertmany(llist, targetnode, newvalues) {

    const newnodelist = createnodelist(newvalues);

    if( newnodelist.length === 0 ) return NODE_NONE;

    insertnodelist(targetnode?.previous, newnodelist, targetnode);

    if( llist.head === targetnode ) llist.head = newnodelist.head;
    if( llist.tail === NODE_NONE ) llist.tail = llist.head;

    llist.length += newnodelist.length;

    return llist.length;
}

function peek(llist) {
    return llist.tail?.value;
}

function pop(llist) {

    const lastnode = llist.tail;

    if( lastnode === NODE_NONE ) return undefined;

    removenode(llist, lastnode);

    return lastnode.value;
}

function push(llist, value) {

    llist.tail = createnode(llist.tail, value);

    llist.length += 1;

    return llist.length;
}

function pushmany(llist, iterable) {

    const newnodes = createnodelist(iterable);
    if( newnodes.length === 0 ) return;

    (llist.length === 0) ? (llist.head = newnodes.head) : (llist.tail.next = newnodes.head);
    llist.tail = newnodes.tail;
    llist.length = newnodes.length;

    return llist.length;
}

function removenode(llist, targetnode) {

    const nextnode = targetnode?.next;
    const previousnode = targetnode?.previous;

    if( nextnode === NODE_NONE && previousnode === NODE_NONE ) return llist;

    targetnode.next = targetnode.previous = undefined;

    if( nextnode !== NODE_NONE ) nextnode.previous = previousnode;
    if( previousnode !== NODE_NONE ) previousnode.next = nextnode;

    if( llist.head === targetnode ) llist.head = nextnode;
    if( llist.tail === targetnode ) llist.tail = previousnode;

    llist.length -= 1;

    return targetnode?.value;
}

function reverse(llist) {

    const nodelistreverseiterator = getnodelistreverseiterator(llist);
    return linkedlistfromnodes(nodelistreverseiterator);
}