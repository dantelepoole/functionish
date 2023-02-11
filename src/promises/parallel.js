/**
 * @module promises/parallel
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;

const isfunction = require('../types/isfunction');
const noop = require('../noop');
const partial = require('../partial');
const runconcurrent = require('../../lib/runconcurrent');

const onfinish = (resolve, reject) => (error, result) => error ? reject(error) : resolve(result);
const finishiferror = (finish, error) => error && finish(error);

function parallel(failonerror, throttle, ...funcs) {

    if( isfunction(throttle) ) [throttle, funcs] = [DEFAULT_THROTTLE, [throttle, ...funcs]];

    const onfunccomplete = failonerror ? finishiferror : noop;

    const launchparallel = partial(runconcurrent, throttle, funcs, onfunccomplete);

    return function _parallel(...args) {

        const executor = (resolve, reject) => launchparallel( onfinish(resolve, reject), ...args );

        return new Promise(executor);
    }
}

module.exports = parallel;