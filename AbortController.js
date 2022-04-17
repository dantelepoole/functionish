/**
 * @module
 * @ignore
 */

'use strict';

const EVENT_ABORT = 'abort';

const AbortSignal = require('./AbortSignal');

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
