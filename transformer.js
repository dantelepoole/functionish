/**
 * @module transformer
 */

'use strict';

const ERR_BAD_LIST = `TransformerError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransformerError~The transformation has type %s. Expected a function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

const compose = require('./compose');
const fail = require("./fail");
const head = require('./head');
const id = require('./id');
const isempty = require('./isempty');
const isfunction = require('./isfunction');
const isiterable = require('./isiterable');
const issingular = require('./issingular');
const iterate = require('./iterate');
const or = require('./or');
const partial = require('./partial');
const tap = require('./tap');
const typeorclass = require("./typeorclass");
const when = require('./when');

const failbadlist = partial(fail, ERR_BAD_LIST);
const raisebadlist = compose(failbadlist, typeorclass); 
const validatelist = tap( or(isiterable, raisebadlist) );

const failbadtransformation = partial(fail, ERR_BAD_TRANSFORMATION);
const raisebadtransformation = compose(failbadtransformation, typeorclass);
const validatetransformation = or(isfunction, raisebadtransformation);
const validatetransformations = tap( iterate(validatetransformation) );

const compoundtransformer = transformations => partial(compoundtransform, transformations);
const simpletransformer = transformation => partial(simpletransform, transformation);
const buildtransformer = when(issingular, compose(simpletransformer, head), compoundtransformer);

const listtransform = transformer => compose( partial(transform, transformer), validatelist );
const listtransformer = compose(listtransform, buildtransformer, validatetransformations);

const nooptransformer = compose(id, validatelist);

module.exports = function transformer(...transformations) {
    return isempty(transformations) ? nooptransformer : listtransformer(transformations);
}

function transform(transformer, list) {

    return {
        [Symbol.iterator]: function* () {

            for(const value of list) {

                const result = transformer(value);

                if(result !== FILTER_REJECT) yield result;
            }
        }
    }
}

function simpletransform(transformation, value) {

    const result = transformation(value);

    return (result === FILTER_REJECT) ? FILTER_REJECT
         : (result === FILTER_INCLUDE) ? value
         : result;
}

function compoundtransform(transformations, value) {

    for(const transformation of transformations) {

        const result = transformation(value);

        if(result === FILTER_INCLUDE) continue;
        if(result === FILTER_REJECT) return FILTER_REJECT;

        value = result;
    }

    return value;
}
