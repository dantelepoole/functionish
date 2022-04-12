/**
 * @module lift
 */

'use strict';

const isdefined = require('./isdefined');

module.exports = function lift(value) {
    return isdefined(value) ? [value] : [];
}