const expect = require('chai').expect;
const queuemicrotask = require('../src/queuemicrotask');

let presult = undefined;
let wasinvoked = false;

function id(x) {

    wasinvoked = true;
    presult = x;

    return x;
}

function review(done, expectedresult) {

    if( ! wasinvoked ) return done( new Error('The function was not invoked') );
    
    if( presult !== expectedresult ) return done( new Error(`The function returned '${presult} (expected: ${expectedresult})'`) );
    
    done();

}

function queuereview(done, expectedresult) {

    function deferred() {
        if( ! wasinvoked ) return done( new Error('The function was not invoked') );
        if( presult !== expectedresult ) return done( new Error(`The function returned '${presult} (expected: ${expectedresult})'`) );
        done();
    }

    queueMicrotask(deferred);
}

describe(`queuemicrotask()`, function() {

    beforeEach(
        function() {
            wasinvoked = false;
            presult = undefined;
        }
    )

    it(`should return undefined`,
        function () {
            const result = queuemicrotask(id, 42);
            expect( result ).to.be.undefined;
        }
    )

    it(`should not run its function synchronously`,
        function () {
            queuemicrotask(id, 42);
            expect( wasinvoked ).to.be.false;
            expect( presult ).to.be.undefined;
        }
    )

    it(`should run its function asynchronously`,
        function (done) {
            queuemicrotask(id, 42);
            queuereview(done, 42);
        }
    )

    it(`should run its function before the next Timers-phase of the event loop`,
        function (done) {

            setTimeout(
                () => review(done, 42),
                0
            );
            
            queuemicrotask(id, 42);
        }
    )
})