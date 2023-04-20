/**
 * @module lists/transformer
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TYPE_BOOLEAN = 'boolean';
const TYPE_FUNCTION = 'function';

function transformer(...transformations) {

    const transformation = composetransformations(transformations);

    const _transformer = source => transform(transformation, source);
    return _transformer;
}

function transform(transformation, source) {

    return (typeof source === TYPE_FUNCTION)
         ? transducer(transformation, source)
         : listtransformer(transformation, source);
}

function listtransformer(transformation, list) {

    return {

        *[Symbol.iterator]() {

            for(const value of list) {

                const result = transformation(value);

                if(result !== TRANSFORM_REJECT) yield result;
            }
        }
    }
}

function transducer(transformation, reducer) {

    return function _transformreducer(current, nextvalue) {

        nextvalue = transformation(nextvalue);

        return (nextvalue === TRANSFORM_REJECT)
             ? current
             : reducer(current, nextvalue);
    }
}

function composetransformations(transformations) {

    return function _composedtransformation(value) {

        for(let index = 0; index < transformations.length; index += 1) {

            const result = transformations[index](value);

            if(typeof result !== TYPE_BOOLEAN) value = result;
            else if( !result ) return TRANSFORM_REJECT;
        }

        return value;
    }
}

module.exports = transformer;