/**
 * @module
 * @ignore
 */

'use strict';

const ABORTSIGNAL_NAME = 'AbortSignal';

const { EventEmitter } = require('events');
const isfunction = require('./isfunction');

const defineproperties = Object.defineProperties;

module.exports = (global.AbortSignal ?? AbortSignal);

class AbortSignal {

    static abort() {

        const signal   = new AbortSignal();
        signal.aborted = true;

        return signal;
    }

    constructor() {
        
        this.aborted = false;
        setsignaleventproperties(this);
    }

    get [Symbol.toStringTag]() { return ABORTSIGNAL_NAME }
}

function setsignaleventproperties(signal) {

    const events = new EventEmitter();

    function addEventListener(eventname, handler) { events.addListener(eventname, handler) }
    function removeEventListener(eventname,handler) { events.removeListener(eventname, handler) }
    function dispatchEvent(eventname) {

        const signal = this;
        const event  = eventfactory(eventname, signal);

        const handlername = buildeventhandlername(eventname);
        const handler     = signal[handlername];

        if( isfunction(handler) ) handler(event);
    
        events.emit(eventname, event);
    }

    defineproperties(signal, {
        'addEventListener'    : { value:addEventListener },
        'removeEventListener' : { value:removeEventListener },
        'dispatchEvent'       : { value:dispatchEvent }
    })

}

function buildeventhandlername(eventname) {
    return `on${eventname}`;
}

function eventfactory(eventname, target) {
    return {
        type: eventname,
        target
    }
}
