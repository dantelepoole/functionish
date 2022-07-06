const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);
const variadic = require('../variadic');

describe('variadic()', function() {

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