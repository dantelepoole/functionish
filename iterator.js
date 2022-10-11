/**
 * @module iterable
 */

'use strict';

const ERR_NOT_ITERABLE = `IteratorError~The argument has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = function iterator(iterable) {

    notiterable(iterable) && fail(ERR_NOT_ITERABLE, typeorclass(iterable));

    return iterable[Symbol.iterator]();
}