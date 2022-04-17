/**
 * @module timeoutabort
 */

'use strict';

const ABORT_EVENT = 'abort';
const OPTIONS_ONCE = Object.freeze( { once:true } );

const bind = require('./bind');
const not = require('./not');
const timeout = require('./timeout');

module.exports = require('./curry2') (timeoutabort)

function timeoutabort(delayms, abortcontroller) {

    const abort = bind('abort', abortcontroller);
    const canceltimeout = timeout(delayms, abort);

    addaborteventlistener(canceltimeout, abortcontroller.signal);

    return canceltimeout;
}

function addaborteventlistener(eventlistener, abortsignal) {
    if( not(abortsignal.aborted) ) abortsignal.addEventListener(ABORT_EVENT, eventlistener, OPTIONS_ONCE)
}
