/**
 * @module transformer
 */

'use strict';

const ERR_BAD_LIST = `TransformerError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransformerError~The transformation has type %s. Expected a function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

const fail = require("./fail");
const map = require('./map');
const notfunction = require("./notfunction");
const notiterable = require('./notiterable');
const typeorclass = require("./typeorclass");

const validatetransformations = map(
    transformation => notfunction(transformation) 
                       &&
                      fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation))
)

module.exports = function transformer(...transformations) {

    validatetransformations(transformations);

    return function functionish_transform(list) {

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return transform(transformations, list);
    }
}

function transform(transformations, list) {

    return {
        [Symbol.iterator]: function* () {

            for(let value of list) {

                let index = 0;

                while(index < transformations.length) {

                    const result = transformations[index](value);

                    if(result !== FILTER_INCLUDE) value = result;

                    if(value === FILTER_REJECT) break;

                    index += 1;
                }

                if(value !== FILTER_REJECT) yield value;
            }
        }
    }
}