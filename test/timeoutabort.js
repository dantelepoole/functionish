const expect = require('chai').expect;
const timeoutabort = require('../timeoutabort');
const AbortController = require('../AbortController');

const OPTIONS_ONCE = Object.freeze( { once:true } );

function waitfor(callback, ...expectedargs) {

    return function wait(...args) {
        expect(args).to.be.deep.equal(expectedargs);
        callback();
    }

}

const noop = ()=>{}

describe(`timeoutabort()`, function() {

    it(`should be tested`);
})