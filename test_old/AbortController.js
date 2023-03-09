const expect = require('chai').expect;
const spy = require('sinon').spy;
const AbortController = require('../AbortController');
const AbortSignal = require('../AbortSignal');

describe(`AbortController`, function() {

    it(`should have a signal-property that is an instance of the AbortSignal class`,
        function () {

            const controller = new AbortController();
            expect(controller.signal).to.be.an.instanceof(AbortSignal);
        }
    )

    it(`should have an abort() method that triggers an 'abort' event on its signal`,
        function () {

            const controller = new AbortController();
            expect(controller.abort).to.be.a('function');

            const aborteventhandler = spy(event => expect(event?.type).to.be.equal('abort'));
            controller.signal.addEventListener('abort', aborteventhandler);
            controller.abort();
            expect(aborteventhandler.callCount).to.be.equal(1);
        }
    )

})
