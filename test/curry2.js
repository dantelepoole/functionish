const expect = require('chai').expect;
const curry2 = require('../src/curry2');

function countargs(...args) {
    return args.length;
}

function returnargs(...args) {
    return args;
}

describe(`curry2()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( curry2(countargs) ).to.be.a('function');
        }
    )

    it(`should collect two arguments before invoking the function`,
        function () {
            expect( curry2(countargs)(42)(42) ).to.be.equal(2);
            expect( curry2(countargs)(42, 42) ).to.be.equal(2);

        }
    )

    it(`should invoke the function with the collected argument`,
        function () {
            expect( curry2(returnargs)(42)(42) ).to.be.deep.equal([42,42]);
            expect( curry2(returnargs)(42, 42) ).to.be.deep.equal([42,42]);
        }
    )

})