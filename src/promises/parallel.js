/**
 * @module promises/parallel
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;
const MODE_FAILFAST = 'failfast';

const concurrent = require('../../lib/concurrent');
const isfailmodefast = mode => (mode === MODE_FAILFAST);
const isfunction = require('../types/isfunction');
const noop = require('../noop');
const partial = require('../partial');

const finishonerror = (index, finish, error, data) => error && finish(error);

function parallel(failmode, throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const onfunccomplete = isfailmodefast(failmode) ? finishonerror : noop;

    return partial(concurrent, throttle, funcs, onfunccomplete);
}

module.exports = parallel;