const array = require('../src/array');
const expect = require('chai').expect;
const maplist = require('../src/maplist');
const isiterable = require('../src/isiterable');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const double = spy( x => x*2 );

const number1to5 = Object.freeze([1,2,3,4,5]);

describe(`maplist()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return an iterable object`,
        function() {
            const iterable = maplist(double, number1to5);
            expect( isiterable(iterable) ).to.be.true;
        }
    )

    it(`should throw if the predicate is not a function`,
        function() {
            expect( ()=>maplist({}, number1to5) ).to.throw();
        }
    )

    it(`should throw if the list is not an iterable object`,
        function() {
            expect( ()=>maplist(double, {}) ).to.throw();
        }
    )

    describe(`the iterable returned by maplist()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should apply the mapping function to each item in the list`,
            function() {
                const result = array( maplist(double, number1to5) );
                expect(result).to.be.deep.equal([2,4,6,8,10]);
            }
        )

        it(`should call the mapping function once for each item in the list`,
            function() {
                const result = array( maplist(double, number1to5) );
                expect(double.callCount).to.equal(number1to5.length);
            }
        )

        it(`should produce no items if the list is empty`,
            function() {
                const result = array( maplist(double, []) );
                expect(result).to.be.an('array').with.length(0);
            }
        )

    })
})