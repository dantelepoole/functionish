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

function race(throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const launchrace = partial(runconcurrent, throttle, funcs, finishifsuccess);

    return function _race(...args) {

        const executor = (resolve, reject) => launchrace( onfinish(resolve, reject), ...args );

        return new Promise(executor);
    }
}

function onfinish(resolve, reject) {

    return function finishrace(error, result) {

        error ? reject(error)
        : (result instanceof RaceResult) ? resolve(result.value)
        : reject( racefailerror() );

    }
}

function finishifsuccess(finish, error, result) {
    if( !error ) finish(ERROR_NONE, new RaceResult(result));
}

function racefailerror() {

    const error = new Error(ERROR_RACE_FAILED);
    error.name = ERROR_RACE_FAILED_NAME;

    return error;
}

class RaceResult {

    value = undefined

    constructor(result) {
        this.value = result;
    }
}

module.exports = race;