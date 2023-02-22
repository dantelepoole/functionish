/**
 * @module promises/pdelay
 */

'use strict';

const compose = require('../compose');
const curry2 = require('../curry2');
const partial = require('../partial');

const targetfuncexecutorfactory = targetfunc => (resolve, reject) => partial(fulfilltargetfunc, targetfunc, resolve, reject);

function pdelay(delayms, targetfunc, ...args) {

    const targetfuncexecutor = targetfuncexecutorfactory(targetfunc);

    return new Promise(
        (resolve, reject) => setTimeout( targetfuncexecutor(resolve, reject), delayms, ...args)
    )
}

function fulfilltargetfunc(targetfunc, resolve, reject, ...args) {

    try {
        const result = targetfunc(...args);
        resolve(result);
    } catch(error) {
        reject(error);
    }
}

module.exports = curry2(pdelay);