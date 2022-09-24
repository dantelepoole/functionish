/**
 * @module flatlist 
 */
'use strict';

const ERR_BAD_LIST = `FlatListError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_DEPTH = `FlatListError~The depth is %s. Expected a positive integer number.`;

const fail = require('./fail');
const islessthan = require('./islessthan');
const islessthanorequal = require('./islessthanorequal');
const isnumber = require('./isnumber');
const notequal = require('./notequal');
const notinteger = require('./notinteger');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const notinfinity = notequal(Infinity);
const isnegative = islessthan(0);
const ismaxdepth = islessthanorequal(0);
const isbaddepth = depth => notinfinity(depth) && (notinteger(depth) || isnegative(depth));

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

        if(arguments.length === 1) [depth, flattenable] = DEFAULT_DEPTH, depth;

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));
        isbaddepth(depth) && failbaddepth(depth);
        
        return {
            [Symbol.iterator] : () => recursiveflat(depth, list)
        }
    }
)

function failbaddepth(depth) {

    const messagepart = isnumber(depth) ? String(depth) : `a ${typeorclass(depth)}`;

    fail(ERR_BAD_DEPTH, messagepart);
}

function* recursiveflat(depth, iterable) {

    for(const item of iterable) {

        if(ismaxdepth(depth) || notiterable(item)) yield item;
        else yield* recursiveflat(depth-1, item);

    }
}