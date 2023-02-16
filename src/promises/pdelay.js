/**
 * @module promises/pdelay
 */

'use strict';

const compose = require('../compose');
const curry2 = require('../curry2');

function pdelay(delayms, targetfunc) {

    const executor = resolve => setTimeout( compose(resolve, targetfunc), delayms );

    return new Promise(executor);
}

module.exports = curry2(pdelay);