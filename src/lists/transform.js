/**
 * @module lists/transform
 */

'use strict';

const ERR_BAD_SOURCE = `functionish/lists/transform(): The source argument has type %s. Expected an iterable object or a reducer function.`;
const TRANSFORM_REJECT = Symbol.for('functionish/lists/transform#TRANSFORM_REJECT');

const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const isboolean = require('../types/isboolean');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const list = require('./list');
const partial = require('../partial');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const buildtransformer = transformations => isfunction(transformations)
                                          ? partial(applytransformation, transformations)
                                          : partial(transformvalue, transformations); 

const isrejected = x => (x === TRANSFORM_REJECT);
const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);

function transform(transformations, source) {

    const transformer = buildtransformer(transformations);

    return isfunction(source) ? partial(transformreducer, transformer, source)
         : isiterable(source) ? transformlist(transformer, source)
         : raisebadsource(source);
}

function applytransformation(transformation, value) {

    const transformresult = transformation(value);

    return isboolean(transformresult)
            ? transformresult ? value : TRANSFORM_REJECT
            : transformresult;
}

function transformvalue(transformations, value) {

    for(let i = 0; i < transformations.length; i += 1) {

        const transformresult = transformations[i](value);

        if( isboolean(transformresult) ) {

            if(transformresult) continue;
            else return TRANSFORM_REJECT;
        }

        value = transformresult;
    }

    return value;
}

function transformlist(transformer, sourcelist) {

    return list(

        function* () {

            for(const value of sourcelist) {

                const transformresult = transformer(value);

                isrejected(transformresult) || (yield transformresult);
            }
        }
    )
}

function transformreducer(transformer, reducer, accumulator, value) {

    const transformresult = transformer(value);

    return isrejected(transformresult)
         ? accumulator
         : reducer(accumulator, transformresult);
}

module.exports = curry(1, transform);