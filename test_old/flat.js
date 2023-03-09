const expect = require('chai').expect;
const flat = require('../flat');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const array1dimension = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const array2dimensions = Object.freeze([[1,2], [3,4], [5,6], [7,8], [9,10]]);
const array3dimensions = Object.freeze([[[1,2]], [[3,4]], [[5,6]], [[7,8]], [[9,10]]]);

describe(`flat()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should flatten the list's values by one level`,
        function () {
            let result = Array.from( flat(array2dimensions) );
            expect(result).to.deep.equal(array1dimension);

            result = Array.from( flat(array3dimensions) );
            expect(result).to.deep.equal(array2dimensions);
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>flat({}) ).to.throw();
        }
    )

    it(`should not flatten strings to individual characters`,
        function () {
            expect( Array.from( flat(['foo','bar']) ) ).to.deep.equal(['foo','bar']);
        }
    )
})
