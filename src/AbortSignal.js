/**
 * Polyfill for the Web API AbortSignal interface. If an AbortSignal class already exists in the global 
 * namespace, it is exported instead of the polyfill.
 * 
 * @class AbortSignal
 * @see {@link external:AbortSignal AbortSignal}
 * @see {@link AbortController AbortController}
 */

'use strict';

const ABORTEVENT = 'abort';
const ABORTSIGNAL_NAME = 'AbortSignal';
const TYPE_FUNCTION = 'function';

const { EventEmitter } = require('events');

const defineproperties = Object.defineProperties;

class AbortSignal {

    static abort() {

        const signal = new AbortSignal();
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

    function addEventListener(eventname, handler) { 
        events.addListener(eventname, handler)
    }

    function removeEventListener(eventname,handler) { 
        events.removeListener(eventname, handler)
    }
    
    function dispatchEvent(eventname) {

        const signal = this;
        const event = eventfactory(eventname, signal);

        if( eventname === ABORTEVENT ) signal.aborted = true;

        const handlername = buildeventhandlername(eventname);
        const handler = signal[handlername];

        if(typeof handler === TYPE_FUNCTION) handler(event);
    
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


module.exports = (global.AbortSignal ?? AbortSignal);