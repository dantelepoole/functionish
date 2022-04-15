const binary = require('../binary');
const expect = require('chai').expect;

function returnargs(...args) { return args }

describe('binary()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return a function with a length of 2',
        function () {
            expect( binary(returnargs) ).to.be.a('function').with.lengthOf(2);
        }
    )

    it('should return a function always receives two parameters, no matter how many arguments were passed',
        function () {
            const returnargs_binary = binary(returnargs);
            expect( returnargs_binary(1,2) ).to.be.deep.equal([1,2]);
            expect( returnargs_binary(1,2,3,4,5) ).to.be.deep.equal([1,2]);
            expect( returnargs_binary(1) ).to.be.deep.equal([1, undefined]);
            expect( returnargs_binary() ).to.be.deep.equal([undefined, undefined]);
        }
    )

    it('should return a function that throws if the argument to binary() is not a function',
        function () {
            const binary_func = binary(42);
            expect( binary_func ).to.throw();
        }
    )
})