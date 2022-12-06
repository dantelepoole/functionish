/**
 * @module transformer
 */

'use strict';

const ERR_BAD_LIST = `TransformerError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransformerError~The transformation has type %s. Expected a function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

const fail = require("./fail");
const isempty = require('./isempty');
const issingular = require('./issingular');
const iterate = require('./iterate');
const notfunction = require("./notfunction");
const notiterable = require('./notiterable');
const typeorclass = require("./typeorclass");

const validatetransformation = transformation => notfunction(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
const validatetransformations = iterate(validatetransformation);

module.exports = function transformer(...transformations) {

    validatetransformations(transformations);

    return function functionish_transform(list) {

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return isempty(transformations) ? list
             : issingular(transformations) ? transform_simple(transformations[0], list)
             : transform(transformations, list);
    }
}

function transform_simple(transformation, list) {

    return {
        [Symbol.iterator]: function* () {

            for(const value of list) {

                const result = transformation(value);

                if(result === FILTER_REJECT) continue;

                yield (result === FILTER_INCLUDE) ? value : result;
            }
        }
    }
}

function transform(transformations, list) {

    return {
        [Symbol.iterator]: function* () {

            for(let value of list) {

                for(const transformation of transformations) {

                    const result = transformation(value);

                    if(value === FILTER_REJECT) break;
                    else if(result !== FILTER_INCLUDE) value = result;
                }

                if(value !== FILTER_REJECT) yield value;
            }
        }
    }
}