/**
 * @module lists/transform
 */

'use strict';

const FILTER_ACCEPT = true;
const FILTER_DISCARD = false;
const THIS_NULL = null;
const TRANSFORM_DISCARD = null;

const curry = require('../curry');

const isfunction = require('../types/isfunction');

function transform(transformations, source) {

    const transformer = transformvalue.bind(THIS_NULL, transformations);

    return isfunction(source)
         ? transformreducer.bind(THIS_NULL, transformer, source)
         : transformlist(transformer, source);
}

function transformvalue(transformations, value) {

    for(let index = 0; index < transformations.length; index += 1) {

        const transformedvalue = transformations[index](value);

        if(transformedvalue === FILTER_DISCARD) return TRANSFORM_DISCARD;
        if(transformedvalue === FILTER_ACCEPT) continue;

        value = transformedvalue;
    }

    return { value };
}

function transformlist(transformer, list) {

    return {
        *[Symbol.iterator]() {

            for(const item of list) {

                const transformresult = transformer(item);

                if(transformresult !== TRANSFORM_DISCARD) yield transformresult.value;
            }
        }
    }
}

function transformreducer(transformer, reducer, accumulator, value) {

    const transformresult = transformer(value);

    return (transformresult === TRANSFORM_DISCARD)
         ? accumulator
         : reducer(accumulator, transformresult.value);
}

module.exports = curry(1, transform);