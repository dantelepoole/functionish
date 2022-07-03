/**
 * @module flatlist 
 */
'use strict';

const ERR_BAD_LIST = `FlatListError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_DEPTH = `FlatListError~The depth is %s. Expected a positive integer number.`;

const fail = require('./fail');
const isinteger = require('./isinteger');
const isnumber = require('./isnumber');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const isvaliddepth = depth => (isinteger(depth) && (depth >= 0)) || (depth === Infinity);

/**
 * Recursively flatten the (iterable) items in the *list* to the specified *depth*. 
 * 
 * `flatlist()` is curried by default.
 * 
 * @func flatlist
 * @param {number} depth The maximum recursion depth
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function flatlist(depth, list) {

        if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));
        if( ! isvaliddepth(depth) ) failbaddepth(depth);
        
        return {
            [Symbol.iterator] : () => recursiveflat(depth, list)
        }
    }
)

function failbaddepth(depth) {

    fail(
        ERR_BAD_DEPTH,
        isnumber(depth) ? String(depth) : `a ${typeorclass(depth)}`
    )
}

function* recursiveflat(depth, iterable) {

    const maxdepth = (depth <= 0);

    for(const item of iterable) {

        if(maxdepth || notiterable(item)) yield item;
        else yield* recursiveflat(depth-1, item);

    }
}