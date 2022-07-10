const expect = require('chai').expect;
const curry3 = require('../src/curry3');

function countargs(...args) {
    return args.length;
}

function returnargs(...args) {
    return args;
}

describe(`curry3()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( curry3(countargs) ).to.be.a('function');
        }
    )

    it(`should collect three arguments before invoking the function`,
        function () {
            expect( curry3(countargs)(42)(42)(42) ).to.be.equal(3);
            expect( curry3(countargs)(42, 42, 42) ).to.be.equal(3);

        }
    )

    it(`should invoke the function with the collected argument`,
        function () {
            expect( curry3(returnargs)(42)(42)(42) ).to.be.deep.equal([42,42,42]);
            expect( curry3(returnargs)(42, 42, 42) ).to.be.deep.equal([42,42,42]);
        }
    )

})