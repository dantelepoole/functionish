/**
 * Return a reducer function that passes its second argument (nextvalue) through *transformations* functions before 
 * passing the result to the *reducer* function (along with its first argument, the accumulator). This allows you apply
 * one or more mapping or filtering functions as a reduction, thus avoiding the need to loop over an array multiple
 * times (which would be the case if you applied the mapping or filtering functions individually before performing the
 * reduce).
 * 
 * The *transformations* argument may also be a single transformation function instead of an array.
 * 
 * Each *transformation* may be either one of two types of functions:
 * 1. A regular transformation: any function that takes a single argument and returns a value to replace it, i.e. the
 * type of function that you would pass to {@link module:map map()}. 
 * 2. A filter transformation: any function that acts as a predicate by taking a single argument and returning `true`
 * or `false` to indicate whether or not the argument is acceptable or not, i.e. the type of function you would pass
 * to `filter()`.
 * 
 * A regular transformation function can be passed to `transform()` directly, but a filter transformation function must
 * be first passed to {@link module:predicate predicate()} so that `transform()` can identify the transformation as
 * a filter transformation. Failing to tag a filter transformation as a predicate function before passing it to
 * `transform()` will cause `transform()` to treat it as a regular function, which is certain to cause unexpected
 * behaviour and incorrect results.
 * 
 * The returned reducer function is a regular reducer that can be passed to `reduce()`.
 * 
 * `transform()` is curried by default, as is the reducer function it returns. This makes it easy to compose multiple
 * transformers into a single reducer, as is shown in the example code. The *initialvalue* argument passed to
 * `reduce()` should be the initial value that the *reducer* argument expects to receive.
 * 
 * @module transform
 * @see {@link module:predicate predicate()}
 * @see {@link module:transduce transduce()}
 * @see {@link module:transmap transmap()}
 * @param {function[]} transformations The transformations to perform in the reduction
 * @param {function} reducer The reducer
 * @returns {function} A new reducer function
 * @example
 * 
 * const compose = require('functionish/compose');
 * const transform = require('functionish/transform');
 * const predicate = require('functionish/predicate');
 * 
 * function iseven(x) { return (x%2) === 0 }
 * function double(x) { return (x*2) }
 * function sum(x, y) { return (x+y) }
 * 
 * const numberlist = [1,2,3,4,5];
 * 
 * const transformations = [
 *     predicate(iseven), // !!IMPORTANT!! Always pass filter functions to predicate() first
 *     double
 * ];
 * 
 * // The reduce() will first filter out the odd numbers in the list and then double the remaining two numbers before
 * // adding them together for a final result of `12`, all in just a single iteration over the numberlist array instead
 * // of the three iterations required if `filter(iseven)`, `map(double)` and finally `reduce(sum)` were called
 * // in succession.
 *  
 * reduce(
 *     transform(transformations, sum),
 *     0, // sum() requires an initial value of `0`
 *     numberlist
 * ) 
 * 
 */
'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

const compose = require('./compose');
const curry2 = require('./curry2');
const isfunction = require('./isfunction');
const ispredicate = require('./ispredicate');
const map = require('./map');
const unary = require('./unary');

const filtertransformerfactory = NAMED_FUNCTIONS ? _filtertransformerfactory_named : _filtertransformerfactory;
const transformerfactory = NAMED_FUNCTIONS ? _transformerfactory_named : _transformerfactory;

// We have to apply unary() because we are mapping a curried simpletransform to each transformation, which will
// fail because Javascript's Array.prototype.map() passes multiple arguments to the mapping function, not just the
// item being mapped
const simpletransform_curried = curry2(simpletransform);
const mapsimpletransform = map( unary(simpletransform_curried) );

module.exports = curry2(

    function transform(transformations, reducer) {

        if( isfunction(transformations) ) return simpletransform(transformations, reducer);

        const transformers = mapsimpletransform(transformations);
        const transformer = compose(transformers);

        return transformer(reducer);
    }
)

function simpletransform(transformation, reducer) {

    return ispredicate(transformation) ? filtertransformerfactory(transformation, reducer)
                                       : transformerfactory(transformation, reducer);
}

function _transformerfactory(transformation, reducer) {
    
    function transformreducer(accumulator, nextvalue) {
        return reducer(accumulator, transformation(nextvalue));
    }

    return curry2(transformreducer);
}

function _filtertransformerfactory(predicate, reducer) {

    function filterreducer(accumulator, nextvalue) {
        
        const predicateresult = !! predicate(nextvalue);
        return predicateresult ? reducer(accumulator, nextvalue) : accumulator;
    }

    return curry2(filterreducer);
}

function _transformerfactory_named(transformation, reducer) {
    
    const reducername = `transform-reduce[${reducer.name}] ${transformation.name}`;

    const container = {
        [reducername] : function (accumulator, nextvalue) {
            return reducer(accumulator, transformation(nextvalue));
        }
    }

    return curry2( container[reducername] );
}

function _filtertransformerfactory_named(predicate, reducer) {

    const reducername = `filter-reduce[${reducer.name}] ${func.name}`;

    const container = {
        [reducername] : function (accumulator, nextvalue) {
        
            const predicateresult = !! predicate(nextvalue);
            return predicateresult ? reducer(accumulator, nextvalue) : accumulator;
        }
    }

    return curry2( container[reducername] );
}