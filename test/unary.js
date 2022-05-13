const unary = require('../unary');
const expect = require('chai').expect;

function returnargs(...args) { return args }

describe('unary()', function() {

    it('should return a function with a length of 1',
        function () {
            expect( unary(returnargs) ).to.be.a('function').with.lengthOf(1);
        }
    )

    it('should return a function always receives one parameter, no matter how many arguments were passed',
        function () {
            const returnargs_unary = unary(returnargs);
            expect( returnargs_unary(1,2) ).to.be.deep.equal([1]);
            expect( returnargs_unary(1,2,3,4,5) ).to.be.deep.equal([1]);
            expect( returnargs_unary(1) ).to.be.deep.equal([1]);
            expect( returnargs_unary() ).to.be.deep.equal([undefined]);
        }
    )

    it('should return a function that throws if the argument to argument() is not a function',
        function () {
            const unary_func = unary(42);
            expect( unary_func ).to.throw();
        }
    )
})