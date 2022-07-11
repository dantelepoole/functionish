const expect = require('chai').expect;
const memoize = require('../src/memoize');
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe(`memoize()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be tested`)

    // describe(<ENTER SUBSUITE NAME>, function() {

    //     afterEach(function() {
    //         sandbox.resetHistory();
    //     })
            
    //     beforeEach(function() {})

    //     it(`should be tested`)

    // })
})