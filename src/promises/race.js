/**
 * @module promises/race
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;
const ERROR_RACE_FAILED = `All functions in the race threw an error.`;
const ERROR_RACE_FAILED_NAME = `RaceFailError`;
const ERROR_NONE = null;

const isfunction = require('../types/isfunction');
const partial = require('../partial');
const runconcurrent = require('../../lib/runconcurrent');
const { platform } = require('os');

class RaceResult {

    value = undefined

    constructor(result) {
        this.value = result;
    }
}

const finishunlesserror = (finish, error, result) => error || finish(ERROR_NONE, new RaceResult(result));

const validateraceresult = raceresult => (raceresult instanceof RaceResult)
                                       ? raceresult.value
                                       : failrace();

function race(throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const _race = (...args) => runconcurrent(throttle, funcs, finishunlesserror, args)
                                    .then(validateraceresult);

    return _race;
                                }

function failrace() {

    const error = new Error(ERROR_RACE_FAILED);
    error.name = ERROR_RACE_FAILED_NAME;

    throw error;
}

module.exports = race;