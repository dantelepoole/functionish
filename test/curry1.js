const expect = require('chai').expect;
const curry1 = require('../curry1');

function countargs(...args) {
    return args.length;
}

function returnargs(...args) {
    return args;
}

describe(`curry1()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( curry1(countargs) ).to.be.a('function');
        }
    )

    it(`should collect only a single argument before invoking the function`,
        function () {
            expect( curry1(countargs)(42) ).to.be.equal(1);
        }
    )

    it(`should invoke the function with the collected argument`,
        function () {
            expect( curry1(returnargs)(42) ).to.be.deep.equal([42]);
        }
    )

})