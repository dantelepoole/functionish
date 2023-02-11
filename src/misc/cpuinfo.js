/**
 * @module misc/cpuinfo
 */

'use strict';

const getcpucount = require('os').cpus;

function cpuinfo() {
    return getcpucount();
}

module.exports = cpuinfo();