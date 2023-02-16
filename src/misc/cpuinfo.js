/**
 * @module misc/cpuinfo
 */

'use strict';

const getcpuinfo = require('os').cpus;

function cpuinfo() {
    return getcpuinfo();
}

module.exports = cpuinfo();