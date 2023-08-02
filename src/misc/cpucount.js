/**
 * @module misc/cpucount
 */

'use strict';

const CPU_COUNT = require('./cpuinfo').length;

function cpucount() {
    return CPU_COUNT;
}

module.exports = cpucount();