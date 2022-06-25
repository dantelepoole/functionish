const binary = require('../binary');
const expect = require('chai').expect;

function returnargs(...args) { return args }

describe('binary()', function() {

    beforeEach(
        function() {
        }
    )

    it('should throw if the function is not a function',
        function () {
            expect( () => binary(42) ).to.throw();
        }
    )

    describe('the returned function', function() {

        it('should have binary arity',
            function () {
                expect( binary(returnargs) ).to.be.a('function').with.lengthOf(2);
            }
        )

        it('should always receive two parameters, no matter how many arguments were passed',
            function () {
                const returnargs_binary = binary(returnargs);
                expect( returnargs_binary(1,2) ).to.be.deep.equal([1,2]);
                expect( returnargs_binary(1,2,3,4,5) ).to.be.deep.equal([1,2]);
                expect( returnargs_binary(1) ).to.be.deep.equal([1, undefined]);
                expect( returnargs_binary() ).to.be.deep.equal([undefined, undefined]);
            }
        )

        it(`should have the same name as the target function`,
            function () {
                expect(binary(returnargs).name).to.be.equal('returnargs');
            }
        )
    })
})