const expect = require('chai').expect;
const curry4 = require('../src/curry4');

function countargs(...args) {
    return args.length;
}

function returnargs(...args) {
    return args;
}

describe(`curry4()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( curry4(countargs) ).to.be.a('function');
        }
    )

    it(`should collect four arguments before invoking the function`,
        function () {
            expect( curry4(countargs)(42)(42)(42)(42) ).to.be.equal(4);
            expect( curry4(countargs)(42, 42, 42, 42) ).to.be.equal(4);

        }
    )

    it(`should invoke the function with the collected argument`,
        function () {
            expect( curry4(returnargs)(42)(42)(42)(42) ).to.be.deep.equal([42,42,42,42]);
            expect( curry4(returnargs)(42, 42, 42, 42) ).to.be.deep.equal([42,42,42,42]);
        }
    )

})