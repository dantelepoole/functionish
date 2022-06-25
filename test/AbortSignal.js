const expect = require('chai').expect;
const spy = require('sinon').spy;
const AbortSignal = require('../AbortSignal');

describe(`AbortSignal`, function() {

    it(`should have a static abort-method that returns an aborted AbortSignal instance`,
        function () {

            const signal = AbortSignal.abort();

            expect(signal).to.be.an.instanceof(AbortSignal);
            expect(signal.aborted).to.be.true;
        }
    )

    it(`should have a boolean aborted-property`,
        function () {

            const signal = new AbortSignal();
            expect(signal.aborted).to.be.a('boolean');
        }
    )

    it(`should have a dispatchEvent method that triggers an event`,
        function () {

            const signal = new AbortSignal();
            expect(signal.dispatchEvent).to.be.a('function');

            const aborteventhandler = spy(event => expect(event?.type).to.be.equal('abort'));
            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');

            expect(aborteventhandler.callCount).to.be.equal(1);
        }
    )

    it(`should have an addEventListener() method`,
        function () {

            const signal = new AbortSignal();

            expect(signal.addEventListener).to.be.a('function');

            const aborteventhandler = spy(event => expect(event?.type).to.be.equal('abort'));
            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');

            expect(aborteventhandler.callCount).to.be.equal(1);
        }
    )

    it(`should have a removeEventListener() method`,
        function () {

            const signal = new AbortSignal();
            expect(signal.removeEventListener).to.be.a('function');
            
            const aborteventhandler = spy(event => expect(event?.type).to.be.equal('abort'));
            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expect(aborteventhandler.callCount).to.be.equal(1);

            aborteventhandler.resetHistory();
            signal.removeEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expect(aborteventhandler.callCount).to.be.equal(0);
        }
    )

    it(`should call its onabort() method if one has been defined`,
        function () {

            const signal = new AbortSignal();

            const onaborthandler = spy(event => expect(event?.type).to.be.equal('abort'));
            signal.onabort = onaborthandler;
            expect(signal.onabort).to.be.a('function');
            
            signal.dispatchEvent('abort');
            expect(onaborthandler.callCount).to.be.equal(1);
        }
    )
})
