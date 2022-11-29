/**
 * @module transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATIONS = `TransformError~The transformations argument has type %s. Expected an array of functions.`;

const curry2 = require('./curry2');
const fail = require("./fail");
const notarray = require('./notarray');
const notiterable = require('./notiterable');
const transformer = require('./transformer');
const typeorclass = require("./typeorclass");

module.exports = curry2(transform);

function transform(transformations, list) {

    notarray(transformations) && fail(ERR_BAD_TRANSFORMATIONS, typeorclass(transformations));
    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return transformer(...transformations)(list);
}