const witharity = require('../witharity');
const expect = require('chai').expect;

function returnargs(...args) { return args }

describe('witharity()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with binary arity',
        function () {
            const curried = witharity(2);
            expect( curried ).to.be.a('function');
            expect( curried(returnargs) ).to.be.a('function');
        }
    )

    it('should return a function',
        function () {
            expect( witharity(returnargs) ).to.be.a('function');
        }
    )

    describe('the returned function', function() {

        beforeEach(
            function() {
            }
        )
    
        it('should always pass the number of arguments specified by arity to the func, no matter the actual number of arguments it receives',
            function () {
                const result = witharity(2, returnargs);
                expect( Array.from( result(1,2,3,4,5) ) ).to.be.deep.equal([1,2]);
                expect( Array.from( result(1,2) ) ).to.be.deep.equal([1,2]);
                expect( Array.from( result(1) ) ).to.be.deep.equal([1,undefined]);
                expect( Array.from( result() ) ).to.be.deep.equal([undefined,undefined]);
            }
        )
    
    })
})