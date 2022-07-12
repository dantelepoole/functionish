const expect = require('chai').expect;
const classname = require('../classname');

class WithTag { get [Symbol.toStringTag] () { return 'WithTag'; } }
class WithTag2 extends WithTag {}

class NoTag { }
class NoTag2 extends NoTag { }


describe(`classname()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a primitive type's typename capitalized (except null)`,
        function () {

            expect( classname(true) ).to.be.equal('Boolean');
            expect( classname(42) ).to.be.equal('Number');
            expect( classname(-42) ).to.be.equal('Number');
            expect( classname(1.33) ).to.be.equal('Number');
            expect( classname(undefined) ).to.be.equal('Undefined');
            expect( classname('a') ).to.be.equal('String');
            expect( classname(42n) ).to.be.equal('BigInt');
        }
    )

    it(`should return 'Null' for a null argument`,
        function () {
            expect( classname(null) ).to.be.equal('Null');
        }
    )

    it(`should return the name of built-in classes`,
        function () {
            expect( classname(new Date()) ).to.be.equal('Date');
            expect( classname(new Array()) ).to.be.equal('Array');
            expect( classname(new Map()) ).to.be.equal('Map');
            expect( classname(new Set()) ).to.be.equal('Set');
            expect( classname(new RegExp('.*'))  ).to.be.equal('RegExp');
        }
    )

    it(`should return 'Function' for functions and classes`,
        function () {
            expect( classname(()=>{}) ).to.be.equal('Function');
            expect( classname(WithTag) ).to.be.equal('Function');
        }
    )

    it(`should return the value of a custom class' [Symbol.toStringTag] getter, whether or not inherited`,
        function () {
            
            expect( classname(new WithTag()) ).to.be.equal('WithTag');
            expect( classname(new WithTag2()) ).to.be.equal('WithTag');
        }
    )

    it(`should return the name of the object's constructor function if its class no [Symbol.toStringTag] getter`,
        function () {

            expect( classname(new NoTag()) ).to.be.equal('NoTag');
            expect( classname(new NoTag2()) ).to.be.equal('NoTag2');
        }
    )

    it(`should return 'Object' for generic objects`,
        function () {
            expect( classname({}) ).to.equal('Object');
        }
    )
})
