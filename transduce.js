/**
 * @module transduce
 */

'use strict';

const ERR_BAD_REDUCER = `TransduceError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMER = `TransduceError~The transformer has type %s. Expected a function.`;

const composetransformer = require('./lib/composetransformer');
const fail = require('./fail');
const isarray = require('./isarray');
const typeorclass = require('./typeorclass');

module.exports = require('./curry2') (

    function transduce(transformer, reducer) {

        if( isarray(transformer) ) transformer = composetransformer(...transformer);
        else if(typeof transformer !== 'function') fail(ERR_BAD_TRANSFORMER, typeorclass(transformer));
        
        if(typeof reducer !== 'function') fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return function transducer(accumulator, nextvalue) {

            const transformedvalue = transformer(nextvalue);

            return (transformedvalue === false) ? accumulator
                 : (transformedvalue === true) ? reducer(accumulator, nextvalue)
                 : reducer(accumulator, transformedvalue);
        }
    }
)