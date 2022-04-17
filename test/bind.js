const bind = require('../bind');
const expect = require('chai').expect;

const marker = Object.freeze({});

function binary(a,b) { return args };
function returnthis() { return this };
function returnargs(...args) { return args };

describe('bind()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return a bound variant of its first argument',
        function () {
            let result = bind(returnthis, marker);
            expect( result ).to.be.a('function');
            expect( result.name ).to.be.equal('bound returnthis');
        }
    )

    it('should return a function bound to its second argument',
        function () {
            let result = bind(returnthis, marker)();
            expect( result ).to.be.equal(marker);
        }
    )

    it('should return a function that prepends the third (args) argument to the arguments it receives itself',
        function () {
            let result = bind(returnargs, marker, 1,2,3)(4,5,6);
            expect( result ).to.be.deep.equal([1,2,3,4,5,6]);
        }
    )

    it('should decrement its length property with the number of args passed to bind, with a minimum of 0',
        function () {
            let result = bind(binary, marker, 1);
            expect( result.length ).be.equal( binary.length - 1 );

            result = bind(binary, marker, 1, 2);
            expect( result.length ).be.equal( binary.length - 2 );

            result = bind(binary, marker, 1, 2, 3);
            expect( result.length ).be.equal( 0 );
        }
    )

    it('should lookup the target function on its context argument if its func argument is not a function',
        function() {
            let result = bind('log', console);
            expect(result).to.be.a('function');
        }
    )

    it('should throw if its func argument is not a function and its context argument has no method by that name',
        function() {
            expect( () => bind('foobar', {}) ).to.throw();
        }
    )
})