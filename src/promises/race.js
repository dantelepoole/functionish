/**
 * @module promises/race
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;
const ERROR_RACE_FAILED = `All functions in the race failed.`;
const ERROR_RACE_FAILED_NAME = `RaceFailError`;
const ERROR_NONE = null;

const isfunction = require('../types/isfunction');
const concurrent = require('../../lib/concurrent');
const partial = require('../partial');

function race(throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const onracefunccomplete = initonracefunccomplete(funcs.length);

    return partial(concurrent, throttle, funcs, onracefunccomplete);

}

function initonracefunccomplete(funccount) {

    let hitcount = 0;

    return function onracefunccomplete(index, finish, error, data) {

        hitcount += 1;

        if( ! error ) return finish(ERROR_NONE, data);
        else if(hitcount === funccount) failrace();
    }
}

function failrace() {

    const error = new Error(ERROR_RACE_FAILED);
    error.name = ERROR_RACE_FAILED_NAME;

    throw error;
}

module.exports = race;