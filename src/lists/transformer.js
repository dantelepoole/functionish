/**
 * @module lists/transformer
 */

'use strict';

const CONTEXT_NONE = undefined;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

module.exports = function transformer(...transformations) {

    const transformation = transform.bind(CONTEXT_NONE, transformations);
    
    return _transformer.bind(CONTEXT_NONE, transformation);
}

function _transformer(transformation, list) {

    return {

        [Symbol.iterator]: function* () {

            for(const value of list) {

                const transformedvalue = transformation(value);

                if(transformedvalue !== FILTER_REJECT) yield transformedvalue;
            }
        }
    }
}

function transform(transformations, value) {

    for(const transformation of transformations) {

        const transformedvalue = transformation(value);

        if(transformedvalue === FILTER_INCLUDE) continue;

        if(transformedvalue === FILTER_REJECT) return FILTER_REJECT;

        value = transformedvalue;
    }

    return value;
}