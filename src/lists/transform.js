/**
 * @module lists/transform
 */

'use strict';

const THIS_NULL = null;
const FILTER_ACCEPT = true;
const FILTER_REJECT = false;

const isfunction = require('../types/isfunction');

function transform(...transformations) {

    const valuetransformer = transformvalue.bind(THIS_NULL, transformations);

    const _transform = source => isfunction(source)
                               ? transformreducer.bind(THIS_NULL, valuetransformer, source)
                               : transformlist(valuetransformer, source);

    return _transform;
}

function transformvalue(transformations, value) {

    for(const transformation of transformations) {

        const transformedvalue = transformation(value);

        if(transformedvalue === FILTER_ACCEPT) continue;
        if(transformedvalue === FILTER_REJECT) return null;

        value = transformedvalue;
    }

    return { value };
}

function transformlist(transformer, list) {

    return {
        *[Symbol.iterator]() {

            for(const item of list) {

                const transformresult = transformer(item);

                if(transformresult !== null) yield transformresult.value;
            }
        }
    }
}

function transformreducer(transformer, reducer, accumulator, value) {

    const transformresult = transformer(value);

    return (transformresult === null)
         ? accumulator
         : reducer(accumulator, transformresult.value);
}

module.exports = transform;