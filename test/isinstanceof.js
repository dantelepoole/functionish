const expect = require('chai').expect;
const isinstanceof = require('../isinstanceof');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe(`isinstanceof()`, function() {

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