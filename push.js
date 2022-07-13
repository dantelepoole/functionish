/**
 * @module push
 */

'use strict';

const ERR_BAD_PUSHABLE = `PushError~The argument has type %s. Expected an object with a push() method.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Pass *items* to *pushable*'s `push()` method and return the result.
 * 
 * @func push
 * @param {pushable} pushable An object with a `push()` method
 * @param {...any[]} items The items to push
 * @returns {any} *pushable*.push()'s return value
 */
module.exports = function push(pushable, ...items) {

    if(typeof pushable?.push !== 'function') fail(ERR_BAD_PUSHABLE, typeorclass(pushable));

    return pushable.push(...items);
}