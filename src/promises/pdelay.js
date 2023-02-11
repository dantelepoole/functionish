/**
 * @module promises/pdelay
 */

'use strict';

const compose = require('../compose');

function pdelay(delayms, func, ...args) {

    const executor = resolve => setTimeout( compose(resolve, func), delayms, ...args );

    return new Promise(executor);
}

module.exports = pdelay;