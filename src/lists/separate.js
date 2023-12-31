/**
 * @module lists/separate
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/separate(): The list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const validatelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
)

const bufferselector = (predicate, buffertrue, bufferfalse) => item => predicate(item) && buffertrue || bufferfalse;

/**
 * Separate the items in *sourcelist* depending on whether or not *predicate* accepts or rejects an
 * item. The return value is a two-item array with the first array containing an array of items for which *predicate*
 * returned `true` and the second containing an array of items for which *predicate* returned `false`.
 * 
 * If the *predicate* is not a function, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * `separate()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `separate()`</caption>
 * 
 * const { separate } = require('functionish/lists');
 * 
 * const iseven = x => ((x%2) === 0);
 * const list = [1,2,3,4,5,6,7,8,9,10];
 * 
 * separate(iseven, list); // returns [ [2,4,6,8,10], [1,3,5,7,9] ]
 * 
 * @function separate
 * @see {@link module:misc/resolve resolve()}
 * @param {function} predicate The predicate function to apply to each item in *list*
 * @param {iterable} sourcelist An iterable object that produces the items to separate
 * @returns {any[][]}
 */
function separate(predicate, sourcelist) {

    isfunction(predicate) || (predicate = resolve(predicate));

    return issingleton(arguments)
         ? _separate.bind(null, predicate)
         : _separate(predicate, sourcelist);
}

function _separate(predicate, sourcelist) {

    validatelist(sourcelist);

    const buffertrue = [];
    const bufferfalse = [];

    const selectbuffer = bufferselector(predicate, buffertrue, bufferfalse);

    for(const item of sourcelist) selectbuffer(item).push(item);

    return [buffertrue, bufferfalse];
}

module.exports = separate;