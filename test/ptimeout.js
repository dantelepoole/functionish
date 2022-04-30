const expect = require('chai').expect;
const assert = require('chai').assert;
const ptimeout = require('../ptimeout');
const delay = require('../timeout');

const always = x => () => x;
const noop = () => {}

function pdelay(delayms, func, ...args) {

    function executor(resolve, reject) {

        setTimeout(
            (...args) => {
                try {
                    const result = func(...args);
                    resolve( result );
                } catch (error) {
                    reject(error);
                }
            },
            delayms,
            ...args
        )
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

function unexpectedresolve(x) {
    assert(`The timeout promise resolved with value '${x}' while it was supposed to time out.`);
}

describe(`ptimeout()`, function() {

    beforeEach(
        function() {
            presult = undefined;
            perror = undefined;
        }
    )

    it(`should be curried`,
        function () {
            
            const curried = ptimeout(1000);
            expect(curried).to.be.a('function');

            const result = curried( always(42) );
            expect(result).to.be.a('function');
        }
    )

    it(`should return a function that returns a promise`,
        function () {
            
            const func = ptimeout( 1000, id );
            const promise = func(42);

            expect(promise).to.be.a('promise');

            return promise.catch(noop);
        }
    )

    it(`should return a promise that resolves to the function's result if it returns before the timeout expires`,
        function () {

            const delayms = 1000;
            const func = ptimeout(delayms, pdelay);

            let starttime = Date.now();
            const promise = func(100, id, 42);
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

            const func = ptimeout(500, pdelay);
            const promise = func(100, iderror, 'foutje');

            expect(promise).to.be.a('promise');
            return promise.catch( errorhandler('Error', 'foutje') );
        }
    )

    it(`should return a promise that rejects with an AbortError with message 'timeout' if the timeout expires`,
        function () {

            const func = ptimeout(100, pdelay);
            const promise = func(500, id, 42);

            expect(promise).to.be.a('promise');

            return promise.then(unexpectedresolve).catch(errorhandler('AbortError', 'timeout'));
        }
    )

    it(`should still complete the running function even if the timeout has expired`,
        function () {

            const func = ptimeout(100, pdelay);
            const promise = func(500, id, 42);

            expect(promise).to.be.a('promise');
            promise.then(unexpectedresolve).catch(errorhandler('AbortError', 'timeout'));

            return pdelay(
                750,
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