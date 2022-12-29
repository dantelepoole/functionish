/**
 * @module lists/transducer
 */

'use strict';

const CONTEXT_NONE = undefined;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

module.exports = function transducer(...transformations) {
    return reducer => transform_reducer.bind(CONTEXT_NONE, transformations, reducer);
}

function transform_reducer(transformations, reducer, currentvalue, nextvalue) {

    for(const transformation of transformations) {

        const transformedvalue = transformation(nextvalue);

        if(transformedvalue === FILTER_INCLUDE) continue;

        if(transformedvalue === FILTER_REJECT) return currentvalue;

        nextvalue = transformedvalue;
    }

    return reducer(currentvalue, nextvalue);
}