/**
 * @module drop
 */

'use strict';

const ERR_BAD_FILTER = `DropError~The filter has type %s. Expected a function.`;

const fail = require('./fail');
const map = require('./map');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const validatefilter = filter => notfunction(filter) && fail(ERR_BAD_FILTER, typeorclass(filter));
const validatefilters = map(validatefilter);

/**
 * A convenience function that serves the same purpose as {@link module:predicate predicate()} but that accepts and
 * composes multiple *filter* functions to a single filter transformation that can be passed to
 * {@link module:transduce transduce()} or {@link module:transform transform()}.
 * 
 * Contrary to its sister function {@link module:pass pass()}, a `drop()` transformation returns `true` if its value
 * should be ignored and `false` if its value should be accepted.
 * 
 * When passed multiple filter functions, the filter transformation will return `false` for any value that matches all
 * filter functions, signalling that the value should be dropped. If any filter function rejects the value, the value
 * is accepted and the filter transformation will return `true`.
 * 
 * If no filter functions are passed, the transformation will alwayrs return `false` (so each value will be accepted).
 * 
 * @example
 * 
 * const transduce = require('functionish/transduce');
 * const drop = require('functionish/drop');
 * 
 * const iseven = x => (x%2) === 0;
 * const islessthan5 = x => (x < 5);
 * const sum = (x,y) => (x+y);
 * 
 * const transducer = transduce( drop(iseven, islessthan5) );
 * const reducer = transducer(sum);
 * 
 * [1,2,3,4,5,6,7,8,9,10].reduce(reducer, 0); // returns 21
 * 
 * @func drop
 * @param  {...any} filters One or more filter functions
 * @returns {function}
 */
module.exports = function drop(...filters) {

    const compositefilter = composefilters(filters);

    return function _filtertransformation_() {
        return compositefilter;
    }
}

function composefilters(filters) {

    validatefilters(filters);

    return function filter(value) {

        for(let i = 0; i < filters.length; i += 1) if( ! filters[i](value) ) return true;

        return false;
    }
}