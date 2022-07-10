const array = require('../src/array');
const expect = require('chai').expect;
const filterlist = require('../src/filterlist');
const isiterable = require('../src/isiterable');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy( x => (x%2) === 0 );
const alwaysfalse = spy( () => false );
const alwaystrue = spy( () => true );

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

describe(`filterlist()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return an iterable object`,
        function() {
            const iterable = filterlist(iseven, numbers1to10);
            expect( isiterable(iterable) ).to.be.true;
        }
    )

    it(`should throw if the predicate is not a function`,
        function() {
            expect( ()=>filterlist({}, numbers1to10) ).to.throw();
        }
    )

    it(`should throw if the list is not an iterable object`,
        function() {
            expect( ()=>filterlist(iseven, {}) ).to.throw();
        }
    )

    describe(`the iterable returned by filterlist()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should only produce the items from the list for which the predicate returns a truthy value`,
            function() {
                let result = array( filterlist(iseven, numbers1to10) );
                expect(result).to.be.deep.equal([2,4,6,8,10]);

                result = array( filterlist(alwaystrue, numbers1to10) );
                expect(result).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10]);
                expect(result).to.not.equal(numbers1to10);

                result = array( filterlist(alwaysfalse, numbers1to10) );
                expect(result).to.be.an('array').with.length(0);
            }
        )

        it(`should call the predicate once for each item in the list`,
            function() {
                const result = array( filterlist(iseven, numbers1to10) );
                expect(iseven.callCount).to.equal(numbers1to10.length);
            }
        )

        it(`should produce no items if the list is empty`,
            function() {
                const result = array( filterlist(iseven, []) );
                expect(result).to.be.an('array').with.length(0);
            }
        )

    })
})