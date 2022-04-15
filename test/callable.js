const callable = require('../callable');
const expect = require('chai').expect;

const marker = Object.freeze({});

function sum(a,b) { return (a+b) };

describe('callable()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return its argument if it is a function',
        function () {
            let result = callable(sum);
            expect( result ).to.be.a('function');
            expect( result ).to.be.equal(sum);
        }
    )

    it('should return a function that returns its argument if its argument is not a function, regardless of its own arguments',
        function () {
            let result = callable(marker);
            expect( result ).to.be.a('function');
            expect( result() ).to.be.equal(marker);
            expect( result(1,2,4) ).to.be.equal(marker);
        }
    )

    it('should return a function that returns undefined if it is invoked with any arguments',
        function () {
            let result = callable();
            expect( result ).to.be.a('function');
            expect( result() ).to.be.undefined;
            expect( result(1,2,4) ).to.be.undefined;
        }
    )

    it('should return a function that returns only the first argument if it is invoked with multiple arguments',
        function () {
            let result = callable(marker,1,2,3);
            expect( result ).to.be.a('function');
            expect( result() ).to.be.equal(marker);
            expect( result(1,2,4) ).to.be.equal(marker);
        }
    )
})