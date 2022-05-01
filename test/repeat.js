const expect = require('chai').expect;
const repeat = require('../repeat');

let invocationcount = 0;

function returnargs(...args) {
    invocationcount += 1;
    return args;
}

describe(`repeat()`, function() {

    beforeEach(
        function() {
            invocationcount = 0;
        }
    )

    it(`should call its second argument the number of times specified by its first argument`,
        function () {
            repeat(42, returnargs);
            expect(invocationcount).to.be.equal(42);
        }
    )

    it(`should throw if its second argument is not a function`,
        function () {
            expect( ()=>repeat(42, {})).to.throw();
        }
    )

    it(`should pass its third and further arguments as arguments on each invocation`,
        function () {
            function checkargs(...args) {
                expect(args).to.be.deep.equal([1,2,3]);
            }
            repeat(5, checkargs, 1,2,3);
        }
    )

    it(`should not run its second argument at all if the first argument is negative or not a number`,
        function () {
            repeat(-1, returnargs);
            expect(invocationcount).to.be.equal(0);
            repeat(null, returnargs);
            expect(invocationcount).to.be.equal(0);
            repeat('foobar', returnargs);
            expect(invocationcount).to.be.equal(0);
        }
    )
})