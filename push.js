/**
 * @module push
 */

'use strict';

const ERR_BAD_PUSHABLE = `PushError~The argument has type %s. Expected an object with a push() method.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

const ispushable = pushable => isfunction(pushable?.push);

/**
 * Pass *items* to *pushable*'s `push()` method and return the result.
 * 
 * @func push
 * @param {pushable} pushable An object with a `push()` method
 * @param {...any[]} items The items to push
 * @returns {any} *pushable*.push()'s return value
 */
module.exports = function push(pushable, ...items) {
    return ispushable(pushable) ? pushable.push(...items) : fail(ERR_BAD_PUSHABLE, typeorclass(pushable));
}