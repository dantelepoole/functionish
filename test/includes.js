const expect = require('chai').expect;
const includes = require('../includes');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sentinel = {};

function spyincludable(includable) {

    const object = {
        includes : includable.includes.bind(includable)
    }

    spy(object, 'includes');

    return object;
}

describe(`includes()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = includes(42);
            expect(curried).to.be.a('function');
            expect( curried([42]) ).to.be.true;
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>includes(42, {}) ).to.throw();
        }
    )

    it(`should return true if any value in the list is strictly equal to the target value`,
        function () {
            expect( includes(sentinel, [null, undefined, NaN, 42, {}, [], includes, sentinel]) ).to.be.true; 
        }
    )

    it(`should return false if the list contains no value that is strictly equal to the target value`,
        function () {
            expect( includes(sentinel, []) ).to.be.false;
        }
    )

})
