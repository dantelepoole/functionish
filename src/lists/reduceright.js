/**
 * @module lists/reduceright
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/reduceright(): The source list has type %s. Expected an iterable object.`;
const SYMBOL_AUTOREDUCERIGHT = `functionish/lists/reduceright/autoreduceright/tag`;

const AUTO_PROPERTYDESCRIPTOR = Object.freeze({
    configurable: false,
    enumerable  : true,
    value       : SYMBOL_AUTOREDUCERIGHT,
    writable    : false
})

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const setautotag = reduce => Object.defineProperty(reduce, 'Auto', AUTO_PROPERTYDESCRIPTOR);
const isautoreduceright = x => (x === SYMBOL_AUTOREDUCERIGHT);
const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * Function variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. If *sourcelist* has
 * a `reduceRight()` method, call with the *reducer* function and the *initialvalue* and return the result. Otherwise,
 * iterate over *sourcelist* in reverse and call the *reducer* with each item and the previous call's return value (or,
 * on the first call, the *initialvalue*) and return the result.
 * 
 * If the *initialvalue* is set to the `reduceright.Auto` property, `reduceright()` will use *sourcelist*'s last item as
 * the initial value and start iteration with *sourcelist*'s next-to-last item. If *sourcelist* is empty, `undefined`
 * is returned. If *sourcelist* contains a single item, that item is returned. Note that this behavior deviates from
 * {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}.
 * 
 * `reduce()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * const { reduceright } = require('functionish/lists');
 * 
 * const subtract = (a,b) => (a-b);
 * 
 * reduceright(subtract, 100, [1,2,4]); // returns 93
 * reduceright(subtract, 0, [42]); // returns -42
 * reduceright(subtract, 42, []); // returns 42
 * 
 * @function reduceright
 * @see {@link module:misc/resolve resolve()}
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} sourcelist An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, sourcelist) {

    switch(arguments.length) {
        case 1: return _reduceright.bind(null, reducer);
        case 2: return _reduceright.bind(null, reducer, initialvalue);
        default: return _reduceright(reducer, initialvalue, sourcelist);
    }

}

function _reduceright(reducer, initialvalue, sourcelist) {

    return isautoreduceright(initialvalue) ? autoreduceright(reducer, sourcelist)
         : isfunction(sourcelist?.reduceRight) ? sourcelist.reduceRight(reducer, initialvalue)
         : isiterable(sourcelist) ? rightreducelist(reducer, initialvalue, sourcelist)
         : raisebadsourcelisterror(sourcelist);
}

function rightreducelist(reducer, initialvalue, sourcelist) {

    const array = [...sourcelist];

    let accumulator = initialvalue;

    for(let i = array.length-1; i >= 0; i -= 1) accumulator = reducer(accumulator, array[i]);

    return accumulator;
}

function autoreduceright(reducer, sourcelist) {

    isiterable(sourcelist) || raisebadsourcelisterror(sourcelist);

    const array = [...sourcelist];

    let accumulator = array.pop();

    for(let i = array.length-1; i >= 0; i -= 1) accumulator = reducer(accumulator, array[i]);

    return accumulator;
}

module.exports = setautotag(reduceright);
