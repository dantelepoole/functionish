const expect = require('chai').expect;
const includes = require('../src/includes');
const range = require('../src/range');

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

    it(`should pass the value to list's includes() method if it has one`,
        function () {

            let includable = spyincludable([1,2,3,sentinel]);
            expect( includes(sentinel, includable) ).to.be.true;
            expect( includable.includes.calledOnceWith(sentinel) ).to.be.true;

            sandbox.resetHistory();

            includable = spyincludable('foobar');
            expect( includes('b', includable) ).to.be.true;
            expect( includable.includes.calledOnceWith('b') ).to.be.true;
        }
    )

    it(`should work if the list has no includes() method but it is iterable`,
        function () {
            expect( includes(3, range(5)) ).to.be.true;
        }
    )

    it(`should return true if any item in the list is strictly equal to the argument value`,
        function () {
            expect( includes(sentinel, [null, undefined, NaN, 42, {}, [], includes, sentinel]) ).to.be.true; 
        }
    )

    it(`should return false if the list contains no item that is strictly equal to the argument value`,
        function () {
            expect( includes(sentinel, []) ).to.be.false;
        }
    )

    it(`should throw if the list has no includes() method and is not iterable`,
        function () {
            expect( ()=>includes(42, {}) ).to.throw();
        }
    )

    it(`should work properly when searching for NaN`,
        function () {
            expect( includes(NaN, [NaN]) ).to.be.true;
        }
    )
})
