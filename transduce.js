/**
 * @module transduce
 */

'use strict';

const ERR_BAD_REDUCER = `TransduceError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransduceError~The transformation has type %s. Expected a function.`;
const FILTERTRANSFORMATION_NAME = '_filtertransformation_';
const TRANSDUCER_NAME = '_transducer_';

const fail = require('./fail');
const isequal = require('./isequal');
const isfunction = require('./isfunction');
const map = require('./map');
const notfunction = require('./notfunction');
const reduceright = require('./reduceright');
const typeorclass = require('./typeorclass');

const ispredicatename = isequal(FILTERTRANSFORMATION_NAME);
const istransducername = isequal(TRANSDUCER_NAME);

const ispredicate = transformation => ispredicatename(transformation?.name);
const istransducer = transformation => istransducername(transformation?.name);

const transformreducer = (reducer, transducer) => transducer(reducer);
const composetransducers = (transducers, reducer) => reduceright(transformreducer, reducer, transducers);

const createtransducers = map(transducerfactory);

/**
 * Return a transducer function that accept a reducer function and returns a reducer function that applies the
 * *transformation* function in order before applying the reducer.
 * 
 * A *transformation* may be a regular function that accepts a single value and returns a new value to replace it. 
 * Alternatively, a *transformation* may be filter function that accept a single value and return a boolean
 * to indicate whether or not that value should be accepted or ignored. Such a filter function *must* be passed
 * to {@link module:predicate predicate()} (or its helper functions {@link module:pass pass()}
 * or {@link module:drop drop()}) before passing it to `transduce()`. If this step is skipped, `transduce()`
 * will not work properly.
 * 
 * `transducer()` returns a transducer function, i.e. a function that accepts a reducer function and returns a reducer
 * function that applies the *transformation* function in order to each value before passing the result to the
 * argument reducer. If any filter *transformation* rejects a certain value, that values is ignored altogether.
 * 
 * The reducer returned by the transducer function is suitable for passing to any function that knows how to apply a
 * reducer to reduce a list of values, e.g. {@link external:Array.prototype.reduce Array.prototype.reduce()}.
 * 
 * The transducer function returned by `transduce()` will have its name set to *_transducer_*. This name is used to
 * recognize the function as a transducer function, so you should not do anything that could change its name (e.g.
 * calling its `bind()` method, though you shouldn't need to, anyway).
 * 
 * A transformation may also be an existing transducer function, allowing you to compose transformations with
 * transducers.
 * 
 * @example
 * 
 * const transduce = require('functionish/transduce');
 * const predicate = require('functionish/predicate');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * const sum = (x,y) => (x+y);
 * 
 * const transducer = transduce( predicate(iseven), double );
 * const reducer = transducer(sum);
 * 
 * [1,2,3,4,5].reduce(reducer, 0); // returns 12
 * 
 * @func transduce
 * @see {@link module:predicate predicate()}
 * @see {@link module:pass pass()}
 * @see {@link module:drop drop()}
 * @param  {...any} transformations One or more transformation functions
 * @returns {function} A transducer function
 */
module.exports = function transduce(...transformations) {

    const transducers = createtransducers(transformations);

    return function _transducer_(reducer) {

        return isfunction(reducer) ? composetransducers(transducers, reducer)
                                   : fail(ERR_BAD_REDUCER, typeorclass(reducer));
    }

}

function transducerfactory(transformation) {

    return notfunction(transformation) ? fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation))
         : istransducer(transformation) ? transformation
         : _transducer_;

    function _transducer_(reducer) {

        return ispredicate(transformation) ? (a,b) => transformation(b) ? reducer(a,b) : a
                                           : (a,b) => reducer(a, transformation(b));

    }
}