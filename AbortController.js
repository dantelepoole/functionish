/**
 * @module AbortController
 */

'use strict';

const EVENT_ABORT = 'abort';

const AbortSignal = require('./AbortSignal');

/**
 * Polyfill for the Web API AbortController interface. If an AbortController class already exists in the global 
 * namespace, it is used instead of the polyfill.
 * 
 * @class AbortController
 * @see {@link external:AbortController AbortController}
 * @see {@link module:AbortSignal AbortSignal}
 */
module.exports = (global.AbortController ?? AbortController);

class AbortController {

    #signal = new AbortSignal();

    constructor() {}

    get signal() { return this.#signal; }
    get [Symbol.toStringTag]() { return 'AbortController' }

    abort() {

        if( this.#signal.aborted ) return;
        this.#signal.aborted = true;

        this.#signal.dispatchEvent(EVENT_ABORT);
    }

}
