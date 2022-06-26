const expect = require('chai').expect;
const flat = require('../flat');
const isiterable = require('../isiterable');
const list = require('../list');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const array1dimension = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const array2dimensions = Object.freeze([[1,2], [3,4], [5,6], [7,8], [9,10]]);
const array3dimensions = Object.freeze([[[1,2]], [[3,4]], [[5,6]], [[7,8]], [[9,10]]]);

function spyflattenable(flattenable) {

    const object = {
        flat : flattenable.flat.bind(flattenable)
    }

    spy(object, 'flat');

    return object;
}

describe(`flat()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = flat(1);
            expect(curried).to.be.a('function');
            expect(curried(array1dimension)).to.deep.equal(array1dimension);
        }
    )

    it(`should pass the depth to *flattenable*'s flat() method if it has one`,
        function () {
            const flattenable = spyflattenable(array1dimension);
            const result = flat(1, flattenable);
            expect(result).to.deep.equal(array1dimension);
            expect(flattenable.flat.called).to.be.true;
        }
    )

    it(`should flatten the flattenable as an iterable if it has no flat() method`,
        function () {
            const result = flat(1, range(10));
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal(array1dimension);
        }
    )

    it(`should throw if the flattenable has no flat() method and is not iterable`,
        function () {
            expect( ()=>flat(1, {}) ).to.throw();
        }
    )

    it(`should, if flattenable has no flat() method but is iterable, throw if the depth is not a positive integer number or Infinity`,
        function () {
            expect( ()=>flat(-1, range(10)) ).to.throw();
            expect( ()=>flat('foobar', range(10)) ).to.throw();
            expect( ()=>flat(Infinity, range(10)) ).not.to.throw();
        }
    )

    it(`should flatten to the specified number of dimensions`,
        function () {
            expect( flat(1, array2dimensions) ).to.deep.equal(array1dimension);
            expect( flat(1, array3dimensions) ).to.deep.equal(array2dimensions);
            expect( flat(2, array3dimensions) ).to.deep.equal(array1dimension);

            expect( Array.from( flat(1, list(array2dimensions)) ) ).to.deep.equal(array1dimension);
            expect( Array.from( flat(1, list(array3dimensions)) ) ).to.deep.equal(array2dimensions);
            expect( Array.from( flat(2, list(array3dimensions)) ) ).to.deep.equal(array1dimension);
        }
    )
})
