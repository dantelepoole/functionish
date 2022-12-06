/**
 * @module transform
 */

'use strict';

const ERR_BAD_TRANSFORMATIONS = `TransformError~The transformations argument has type %s. Expected an array of functions.`;

const curry2 = require('./curry2');
const fail = require("./fail");
const notarray = require('./notarray');
const transformer = require('./transformer');
const typeorclass = require("./typeorclass");

module.exports = curry2(transform);

function transform(transformations, list) {

    notarray(transformations) && fail(ERR_BAD_TRANSFORMATIONS, typeorclass(transformations));

    return transformer(...transformations)(list);
}