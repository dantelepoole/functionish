const expect = require('chai').expect;
const assert = require('chai').assert;
const ptimeoutabort = require('../ptimeoutabort');
const delay = require('../timeout');
const AbortController = require('../AbortController');

const ABORTSIGNAL_NONE = null;

const always = x => () => x;
const noop = () => {}

function pdelay(delayms, signal, func, ...args) {

    function executor(resolve, reject) {

        const timeoutid = setTimeout(
            () => {

                if( typeof func === 'string' ) {
                    const name = func;
                    const message = args.join();
                    const error = new Error(message);
                    error.name = name;
                    reject(error);
                    return;
                }

                try {
                    resolve( func(...args) );
                } catch (error) {
                    reject(error);
                }
            },
            delayms
        )

        if( signal?.addEventListener ) signal.addEventListener('abort',
            () => {
                clearTimeout(timeoutid);
                const error = new Error('signal');
                error.name = 'AbortError';
                reject(error);
            }
        );

    }

    return new Promise(executor);
}

function iderror(msg) {
    
    const error = new Error(msg);
    perror = error;
    presult = undefined;

    throw error;
}

function id(x) {
    perror = undefined;
    return (presult = x);
}

let perror = undefined;
let presult = undefined;

function wasinvoked() {
    return (perror !== undefined || presult !== undefined);
}

function errorhandler(name, message) {

    return function handler(error) {
        expect(error).to.be.an('Error');
        if( name ) expect(error.name).to.be.equal(name);
        if( message ) expect(error.message).to.be.equal(message);
    }

}

function expectedresolve(x) {

    return function(arg) {
        assert(arg === x, `The function resolved with unexpected value '${arg}' (expected: ${x})`);
    }
}

function unexpectedresolve(x) {
    assert(`The timeout promise resolved with value '${x}' while it was supposed to time out.`);
}

describe(`ptimeoutabort()`, function() {

    beforeEach(
        function() {
            presult = undefined;
            perror = undefined;
        }
    )

    it(`should be curried with ternary arity`,
        function () {
            
            const curried = ptimeoutabort(1000);
            expect(curried).to.be.a('function');

            const controller = new AbortController();
            const stillcurried = curried(controller.signal);
            expect(stillcurried).to.be.a('function');

            const lastcurry = stillcurried( always(42) );
            expect(lastcurry).to.be.a('function');

            const promise = lastcurry('foobar');
            expect(promise).to.be.a('Promise');

            return promise.catch(noop);
        }
    )

    it(`should return a function that returns a promise`,
        function () {
            
            const func = ptimeoutabort( 1000, new AbortController().signal, id );
            const promise = func(42);

            expect(promise).to.be.a('promise');

            return promise.then(expectedresolve(42));
        }
    )

    it(`should return a promise that resolves to the function's result if it returns before the timeout expires`,
        function () {

            const delayms = 1000;
            const controller = new AbortController();
            const func = ptimeoutabort(delayms, controller.signal, pdelay);

            let starttime = Date.now();
            const promise = func(100, controller.signal, id, 42);
            expect(promise).to.be.a('promise');

            return promise.then(
                function(x) {
                    const duration = Date.now() - starttime;
                    expect(duration).to.be.lessThanOrEqual(delayms, `The operation exceeded the timeout of ${delayms}`);
                    expect(x).to.be.equal(42);
                    expect( wasinvoked() ).to.be.true;
                    expect(presult).to.be.equal(42);
                }
            );
        }
    )

    it(`should return a promise that rejects with the function's error if it throws before the timeout expires`,
        function () {

            const controller = new AbortController();
            const func = ptimeoutabort(500, controller.signal, pdelay);
            const promise = func(100, controller.signal, 'Error', 'foutje');

            expect(promise).to.be.a('promise');
            return promise.catch( errorhandler('Error', 'foutje') );
        }
    )

    it(`should return a promise that rejects with an AbortError with message 'timeout' if the timeout expires`,
        function () {

            const controller = new AbortController();
            const func = ptimeoutabort(100, controller.signal, pdelay);
            const promise = func(500, controller.signal, 'Error', 'foutje');

            expect(promise).to.be.a('promise');

            return promise.then(unexpectedresolve).catch(errorhandler('AbortError', 'timeout'));
        }
    )

    it(`should return a promise that rejects with an AbortError with message 'abort' if its abortsignal is triggered`,
        function () {

            const controller = new AbortController();
            const func = ptimeoutabort(100, controller.signal, pdelay);
            const promise = func(500, controller.signal, 'Error', 'foutje');

            expect(promise).to.be.a('promise');

            controller.abort();

            return promise.then(unexpectedresolve).catch(errorhandler('AbortError', 'abort'));
        }
    )

    it(`if its function is not AbortSignal-aware, it should still complete the running function even if the timeout has expired`,
        function () {

            const controller = new AbortController();
            const func = ptimeoutabort(100, controller.signal, pdelay);
            const promise = func(500, ABORTSIGNAL_NONE, id, 42);

            expect(promise).to.be.a('promise');

            promise.then(unexpectedresolve).catch(errorhandler('AbortError', 'abort'));

            return pdelay(
                750,
                ABORTSIGNAL_NONE,
                () => {
                    assert( wasinvoked(), `The function was not invoked within 500ms of it timing out`);
                    if( perror !== undefined ) throw perror;
                    assert( presult === 42, `The function was invoked but returned unexpected value '${presult}'`);
                }
            ).catch(
                error => {
                    if( error?.name === 'AssertionError' ) throw error;

                    if( error?.name === 'AbortError' ) {
                        assert.fail(`The function did not complete within 500ms after it timed out.`);
                        return;
                    }

                    assert.fail(`The function threw after it timed out with error: ${error}`);
                }
            )
        }
    )
})