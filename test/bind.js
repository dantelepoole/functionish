const bind = require('../src/bind');
const expect = require('chai').expect;

const sentinel = Object.freeze({});

function binary(a,b) { return args };
function returnthis() { return this };
function returnargs(...args) { return args };

describe('bind()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return a bound variant of the function',
        function () {
            const result = bind(returnthis, sentinel);
            expect( result ).to.be.a('function');
            expect( result.name ).to.be.equal('bound returnthis');
        }
    )

    it('should return a function that uses has the context as a this-object',
        function () {
            const result = bind(returnthis, sentinel)();
            expect( result ).to.be.equal(sentinel);
        }
    )

    it('should return a function bound to the third and further arguments',
        function () {
            const result = bind(returnargs, sentinel, 1,2,3)(4,5,6);
            expect( result ).to.be.deep.equal([1,2,3,4,5,6]);
        }
    )

    it('should decrement its length property with the number of args passed to bind, with a minimum of 0',
        function () {
            let result = bind(binary, sentinel, 1);
            expect( result.length ).be.equal( binary.length - 1 );

            result = bind(binary, sentinel, 1, 2);
            expect( result.length ).be.equal( binary.length - 2 );

            result = bind(binary, sentinel, 1, 2, 3);
            expect( result.length ).be.equal( 0 );
        }
    )

    it('should lookup the method on the context if the function is not a function',
        function() {
            let result = bind('log', console);
            expect(result).to.be.a('function');
        }
    )

    it('should throw if the function is not a function and the context has no method with a corresponding key',
        function() {
            expect( () => bind('foobar', {}) ).to.throw();
        }
    )
})