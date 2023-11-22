const callable = require('../src/callable');
const expect = require('chai').expect;

const double = x => (2*x);
const UNIQTHING = {}

describe( 'callable()', function() {

        it('should return a function', function() {
            expect( callable(double) ).to.be.a('function');
            expect( callable(UNIQTHING) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it('should be the target value itself if the value is a function', function() {
                expect( callable(double) ).to.equal(double);
            })

            it('should be a function that returns the target value if the value is not a function', function() {
                
                let somethingcallable = callable(UNIQTHING);
                expect( somethingcallable() ).to.be.equal(UNIQTHING);

                somethingcallable = callable(null);
                expect( somethingcallable() ).to.be.equal(null);

                somethingcallable = callable(42);
                expect( somethingcallable() ).to.be.equal(42);
            })

            it(`should return 'undefined' if callable() was called without arguments`, function() {
                expect( callable()() ).to.be.undefined;
            })
        })
    }
);