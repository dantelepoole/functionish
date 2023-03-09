const callable = require('../callable');
const expect = require('chai').expect;

const sentinel = Object.freeze({});

function sum(a,b) { return (a+b) };

describe('callable()', function() {

    beforeEach(
        function() {
        }
    )

    it('should always return a function',
        function () {
            expect( callable(sum) ).to.be.a('function');
            expect( callable(42) ).to.be.a('function');
            expect( callable() ).to.be.a('function');
            expect( callable(undefined) ).to.be.a('function');
            expect( callable(sentinel) ).to.be.a('function');
        }
    )

    it('should return the value if it is a function',
        function () {
            expect( callable(sum) ).to.be.equal(sum);
        }
    )

    describe('the function returned by callable()', function() {

        it(`should always return the value if the value is not a function, regardless of the function's arguments`,
            function () {
                const expression = callable(sentinel);
                expect( expression ).to.be.a('function');
                expect( expression() ).to.be.equal(sentinel);
                expect( expression(1,2,4) ).to.be.equal(sentinel);
            }
        )

        it('should return undefined if callable() was invoked without arguments',
            function () {
                const expression = callable();
                expect( expression ).to.be.a('function');
                expect( expression() ).to.be.undefined;
                expect( expression(1,2,4) ).to.be.undefined;
            }
        )

        it('should return only first argument to callable() if callable() was invoked with multiple arguments',
            function () {
                const expression = callable(sentinel,1,2,3);
                expect( expression ).to.be.a('function');
                expect( expression() ).to.be.equal(sentinel);
                expect( expression(1,2,4) ).to.be.equal(sentinel);
            }
        )
    })
})