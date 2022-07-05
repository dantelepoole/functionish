const expect = require('chai').expect;
const notinstanceof = require('../notinstanceof');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe(`notinstanceof()`, function() {

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