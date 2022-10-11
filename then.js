/**
 * @module then
 */

'use strict';

const ERR_BAD_FIRSTFUNC = `ThenError~The first function argument has type %s. Expected a function.`;
const ERR_BAD_SECONDFUNC = `ThenError~The second function argument has type %s. Expected a function.`;

const fail = require('./fail');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

module.exports = function then(firstfunc, secondfunc, ...partialargs) {

    notfunction(firstfunc) && fail(ERR_BAD_FIRSTFUNC, typeorclass(firstfunc));
    notfunction(secondfunc) && fail(ERR_BAD_SECONDFUNC, typeorclass(secondfunc));

    return function linkedfunctions(...args) {

        const firstresult = firstfunc.call(this, ...args);

        return secondfunc.call(this, ...partialargs, firstresult);
    }
}