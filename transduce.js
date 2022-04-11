/**
 * @module transduce
 */

 'use strict';

 const reduce = require('./reduce');
 const transform = require('./transform');
 
/**
 * Works the same as {@link module:reduce reduce()} except that applies the list of *transformations* to each value
 * being reduced before passing it the *reducer*. This function is simply shorthand for first invoking
 * {@link module:transform transform()} with *transformations* and *reducer* before passing the result to
 * {@link module:reduce reduce()} along with the *initialvalue* and the *list*.
 * 
 * See the documentation for {@link module:transform transform()} for further information about the requirements for
 * the *transformations* argument.
 * 
 * `transduce()` is curried by default.
 * 
 * @example
 * 
 * const predicate = require('functionish/predicate');
 * const transduce = require('functionish/transduce');
 * 
 * function iseven(x) { return (x%2) === 0 }
 * function double(x) { return (x*2) }
 * function sum(x, y) { return (x+y) }
 * 
 * const numberlist = [1,2,3,4,5];
 * 
 * // !!IMPORTANT!! Always pass filter functions to predicate() first
 * const transformations = [ predicate(iseven), double ];
 * 
 * // The transduce() will first filter out the odd numbers in the list and then double the remaining two numbers before
 * // adding them together for a final result of `12`, all in just a single iteration over the numberlist array instead
 * // of the three iterations required if `filter(iseven)`, `map(double)` and finally `reduce(sum)` were called
 * // in succession. This is analogous to: `reduce( transform(transformations, sum), 0, numberlist )`
 *  
 * transduce(transformations, sum, 0, numberlist); // sum() requires an initial value of `0`
 * 
 * @func transduce
 * @see {@link module:reduce reduce()}
 * @see {@link module:transform transform()}
 * @param {function[]} transformations The transformations to apply in the reduction
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer*
 * @param {any[]} list The list of items to transduce
 * @returns {any} The result of the transduction
 */

module.exports = require('./curry')(4,

    function transduce(transformations, reducer, initialvalue, list) {

        const transducer = transform(transformations, reducer);
        return reduce(transducer, initialvalue, list);
    }
)