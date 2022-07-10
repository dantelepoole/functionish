/**
 * @module pass
 */

'use strict';

const ERR_BAD_FILTER = `PassError~The filter at index %d has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * A convenience function that serves the same purpose as {@link module:predicate predicate()} but that accepts and
 * composes multiple *filter* functions to a single filter transformation that can be passed to
 * {@link module:transduce transduce()} or {@link module:transform transform()}.
 * 
 * When passed multiple filter functions, the filter transformation will accept a value if and only if it is accepted
 * by each individual filter. If not filters are passed, the transformation will accept all values.
 * 
 * @example
 * 
 * const transduce = require('functionish/transduce');
 * const pass = require('functionish/pass');
 * 
 * const iseven = x => (x%2) === 0;
 * const islessthan5 = x => (x < 5);
 * const sum = (x,y) => (x+y);
 * 
 * const reducer = transduce( pass(iseven, islessthan5), sum );
 * 
 * [1,2,3,4,5,6,7,8,9,10].reduce(reducer, 0); // returns 12
 * 
 * @func pass
 * @param  {...any} filters One or more filter functions
 * @returns {function}
 */
module.exports = function pass(...filters) {

    validatefilters(filters);

    const filter = composefilters(filters);

    return function _filtertransformation_() {
        return filter;
    }
}

function composefilters(filters) {

    return function filter(value) {

        for(let i = 0; i < filters.length; i += 1) if( ! filters[i](value) ) return false;

        return true;

    }
}

function validatefilters(filters) {

    for(let i = 0; i < filters.length; i += 1) {
        if(typeof filters[i] !== 'function') fail(ERR_BAD_FILTER, i, typeorclass(filters[i]));
    }
}