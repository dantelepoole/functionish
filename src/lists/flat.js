/**
 * @module lists/flat
 */

'use strict';

const ERR_BAD_DEPTH = `functionish/lists/flat(): The depth %s. Expected a positive integer of 0 or more.`;
const ERR_BAD_LIST = `functionish/lists/flat(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isinteger = require('../types/isinteger');
const isnumber = require('../types/isnumber');
const ispositive = require('../math/ispositive');
const ispositiveorzero = require('../math/ispositiveorzero');
const list = require('./list');
const isiterablenotstring = require('../types/isiterablenotstring');
const not = require('../logic/not');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const notiterable = not(isiterablenotstring);
const builddeptherrormessage = depth => isnumber(depth) ? `is ${depth}` : `has type ${depth}`;
const raisebaddeptherror = compose(raise, error.Type(ERR_BAD_DEPTH), builddeptherrormessage);
const validatedepth = depth => isinteger(depth) && ispositiveorzero(depth) || raisebaddeptherror(depth);

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * If *source* has a `flat()` method, invoke it with the *depth* argument and return the result. Otherwise, return a
 * lazy iterable object that flattens the values in *values* by *depth* levels (default: 1).
 * 
 * Althought Javascript strings are iterable, `flat()` does not flatten them.
 * 
 * `flat()` is curried by default by with unary arity.
 * 
 * @example <caption>Example usage of `flat()`</caption>
 * 
 * const { flat } = require('functionish/lists');
 * 
 * const batches = [ [1,2,3], [4,5,6], [7,8], 9, [[10]] ];
 * 
 * Array.from( flat(1, batches) ); // returns [1,2,3,4,5,6,7,8,9,[10]];
 * Array.from( flat(2, batches) ); // returns [1,2,3,4,5,6,7,8,9,10];
 * 
 * @function flat
 * @param {number} [depth=1] The number of levels to recurse
 * @param {iterable} source An iterable object or an object with a `.flat()` method
 * @returns {iterable}
 */
const flat = curry1(function flat(depth=1, source) {

    validatedepth(depth);

    return isfunction(source?.flat) ? source.flat(depth)
         : notiterable(source) ? raisebadlisterror(source)
         : ispositive(depth) ? flatlist(depth, source)
         : source;
});

function* flatsingle(source) {

    for(const item of source) {
        isiterablenotstring(item) ? yield* item : yield item;
    }
}

function *flatdeep(depth, source) {

    for(const item of source) {
        isiterablenotstring(item) ? yield* flatlist(depth-1, item) : yield item;
    }
}

function flatlist(depth, source) {

    return list(
        function* _flatlist() {
            yield* (depth === 1) ? flatsingle(source) : flatdeep(depth, source);
        }
    )
}

module.exports = flat;