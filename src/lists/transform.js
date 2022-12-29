/**
 * @module lists/transform
 */

'use strict';

const isfunction = require('./isfunction');
const buildtransformer = require('./transformer');

module.exports = function transform(transformer, list) {

    isfunction(transformer) || (transformer = buildtransformer(...transformer));

    return transformer(list);
}