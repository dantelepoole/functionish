/**
 * @module lists/transform
 */

'use strict';

const ERR_BAD_SOURCE = `functionish/lists/transform(): The source argument has type %s. Expected an iterable object or a reducer function.`;
const ERR_BAD_TRANSFORMER = `functionish/lists/transform(): The transformer argument has type %s. Expected a function or array of functions.`;

const compose = require('../compose');
const error = require('../errors/error');
const isarray = require('../types/isarray')
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const list = require('./list');
const partial = require('../partial');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const notboolean = x => (typeof x !== 'boolean');
const pojo = value => ( { value } );

const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);
const raisebadtransformer = compose(raise, error.Type(ERR_BAD_TRANSFORMER), typeorclassname);

const adhoctransformreducer = (nexttransform, transform) => partial(adhoctransformer, nexttransform, transform);
const initadhoctransformer = transformer => isarray(transformer)
                                          ? transformer.reduceRight(adhoctransformreducer, pojo)
                                          : raisebadtransformer(transformer);

const iscurried = args => (args.length === 1);

function transform(transformer, source) {

    isfunction(transformer) || (transformer = initadhoctransformer(transformer));

    return iscurried(arguments.length)
         ? partial(transformsource, transformer)
         : transformsource(transformer, source);
}

function transformsource(transformer, source) {

    return isfunction(source) ? partial(transduce, transformer, source)
         : isiterable(source) ? transformlist(transformer, source)
         : raisebadsource(source);
}

function transformlist(transformer, sourcelist) {

    return list(

        function* () {

            for(const value of sourcelist) {

                const transformresult = transformer(value);

                if(transformresult) yield transformresult.value;
            }
        }
    )
}

function adhoctransformer(nexttransform, transform, value) {

    const result = transform(value);

    return notboolean(result) ? nexttransform(result)
         : result ? nexttransform(value)
         : null;

}

function transduce(transformer, reducer, accumulator, value) {

    const transformresult = transformer(value);

    if(transformresult) accumulator = reducer(accumulator, transformresult.value);

    return accumulator;
}

module.exports = transform;