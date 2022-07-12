const array = require('../array');
const expect = require('chai').expect;
const isiterable = require('../isiterable');
const list = require('../list');
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe('list()', function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return an iterable object`, 
        function() {
            expect( isiterable( list(1,2,3) ) ).to.be.true
        }
    )

    describe('the iterable returned by list()', function() {
    
        it(`should produce the arguments to list()`, 
            function() {
                expect( array( list(1,2,3) ) ).to.deep.equal([1,2,3]);
            }
        )

        it(`should include the items produced by any nested iterable objects, one level deep`, 
            function() {
                expect( array( list(1,[2,3],4) ) ).to.deep.equal([1,2,3,4]);
                expect( array( list(1,[2,[3,4]],5) ) ).to.deep.equal([1,2,[3,4],5]);
            }
        )

        it(`should produce no items if no arguments were passed to list()`, 
            function() {
                expect( array( list() ) ).to.deep.equal([]);
            }
        )

    })
})