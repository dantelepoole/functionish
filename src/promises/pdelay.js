/**
 * @module promises/pdelay
 */

'use strict';

const compose = require('../compose');

function pdelay(delayms, targetfunc) {

    const executor = resolve => setTimeout( compose(resolve, targetfunc), delayms );

    return new Promise(executor);
}

module.exports = pdelay;