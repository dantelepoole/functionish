const expect = require('chai').expect;
const predicate = require('../predicate');
const ispredicate = require('../ispredicate');

function id(x) {
    return x;
}

describe(`predicate()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( predicate(id) ).to.be.a('function');
        }
    )

    it(`should return a function that is recognized by ispredicate()`,
        function () {
            const pid = predicate(id);
            expect( ispredicate(pid) ).to.be.true;
        }
    )

    it(`should return a function that passes its arguments to the argument to predicate() and returns its result as a boolean`,
        function () {
            const pid = predicate(id);
            expect( pid(false) ).to.be.false;
            expect( pid(true) ).to.be.true;
            expect( pid(0) ).to.be.false;
            expect( pid(1) ).to.be.true;
            expect( pid('') ).to.be.false;
            expect( pid([]) ).to.be.true;
            expect( pid({}) ).to.be.true;
        }
    )
})