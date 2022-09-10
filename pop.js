/**
 * @module pop
 */

'use strict';

const ERR_BAD_POPPABLE = `PopError~The argument has type %s. Expected an object with a pop() method.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

const ispoppable = poppable => isfunction(poppable?.pop);

/**
 * Call *poppable*'s `pop()` method and return the result.
 * 
 * @func pop
 * @param {poppable} poppable The array to pop the last item from
 * @returns {any} *poppable*.pop()'s return value
 */
module.exports = function pop(poppable) {
    return ispoppable(poppable) ? poppable.pop() : fail(ERR_BAD_POPPABLE, typeorclass(poppable));
}