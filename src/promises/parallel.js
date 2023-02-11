/**
 * @module promises/parallel
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;

const isfunction = require('../types/isfunction');
const noop = require('../noop');
const runconcurrent = require('../../lib/runconcurrent');

const finishonerror = (finish, error) => error && finish(error);

function parallel(failonerror, throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const onfunccomplete = failonerror ? finishonerror : noop;

    const _parallel = (...args) => runconcurrent(throttle, funcs, onfunccomplete, args);
    return _parallel;
}

module.exports = parallel;