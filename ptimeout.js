/**
 * @module ptimeout
 */

'use strict';

const TIMEOUTERROR_NAME = 'TimeoutError';

const isundefined = require('./isundefined');
const papply = require('./papply');

module.exports = require('./curry2') (ptimeout);

function ptimeout(delayms, func, ...preboundargs) {

    return function timeoutpromise(...args) {
        
        const timedpromise = papply(func, ...preboundargs, ...args);
        const timeoutexecutor = timeoutexecutorfactory(delayms, timedpromise);

        return new Promise(timeoutexecutor);
    }
}

function timeoutexecutorfactory(delayms, timedpromise) {

    return function executor(resolve, reject) {

        const timer = timerfactory(delayms);

        const resolvetimeoutpromise = promisefulfillmentfactory(timer, resolve);
        const rejecttimeoutpromise = promisefulfillmentfactory(timer, reject);

        timedpromise
            .then(resolvetimeoutpromise)
            .catch(rejecttimeoutpromise);

        timer.start(

            function onpromisetimeout() {

                timer.stop();
                rejectwithtimeouterror(reject);
            }
        )
    }
}

function promisefulfillmentfactory(timer, fulfillmenthandler) {

    return function promisefulfill(data) {

        if( timer.isstopped() ) return;

        timer.stop();

        fulfillmenthandler(data);
    }
}

function timerfactory(delayms) {

    let timeoutid = undefined;

    const timer = {

        start(handler) {
            checktimeoutid(timeoutid);
            timeoutid = setTimeout(handler, delayms);
        },
        
        stop() {
            clearTimeout(timeoutid);
            timeoutid = undefined;
        },
        
        isstopped() {
            return isundefined(timeoutid);
        }
    }

    return timer;
}

function rejectwithtimeouterror(reject) {

    const error = new Error('timeout');
    error.name = TIMEOUTERROR_NAME;

    reject(error);
}

function checktimeoutid(timeoutid) {

    if( isundefined(timeoutid) ) return;

    const errormessage = `ptimeout(): the timer cannot be started because it is already running`;
    const error = new Error(errormessage);
    error.name = TIMEOUTERROR_NAME;

    throw error;
}