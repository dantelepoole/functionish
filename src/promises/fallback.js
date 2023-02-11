/**
 * @module promises/fallback
 */

'use strict';

const FALLBACK_THROTTLE = 1;

const race = require('./race');

function fallback(...funcs) {
    return race(FALLBACK_THROTTLE, ...funcs);
}

module.exports = fallback;