/**
 * @module transforminject
 */

'use strict';

const ERR_NOT_ITERABLE = `TransformInjectError~The argument has type %s. Expected an iterable object.`;

const TRANSFORM_INJECT = Symbol.for('functionish/transform/TRANSFORM_INJECT');

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = function transforminject(iterable) {

    notiterable(iterable) && fail(ERR_NOT_ITERABLE, typeorclass(iterable));

    return {
        data               : iterable,
        [TRANSFORM_INJECT] : TRANSFORM_INJECT
    }
}