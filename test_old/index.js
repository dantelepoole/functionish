const expect = require('chai').expect;
const functionish = require('../');
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe(`functionish`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be an object`,
        function() {
            expect(functionish).to.be.an('object');
        }
    )

    it(`should be have a single load() method`,
        function() {

            const keys = Object.keys(functionish);
            expect(keys).to.be.deep.equal(['load']);
            expect(functionish.load).to.be.a('function');
        }
    )

    describe(`the load() method of the functionish object`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should require() the specified functions and store them as methods on the functionish object`,
            function() {
                functionish.load('curry', 'partial', 'reduce');
                expect(functionish.curry).to.be.a('function');
                expect(functionish.partial).to.be.a('function');
                expect(functionish.reduce).to.be.a('function');
            }
        )

        it(`should return the functionish object itself`,
            function() {
                const result = functionish.load('map');
                expect(result).to.equal(functionish);
            }
        )

    })
})