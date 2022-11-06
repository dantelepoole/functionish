const collect = require('../collect');
const expect = require('chai').expect;
const flatlist = require('../flatlist');
const isiterable = require('../isiterable');
const list = require('../list');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const array1dimension = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const array2dimensions = Object.freeze([[1,2], [3,4], [5,6], [7,8], [9,10]]);
const array3dimensions = Object.freeze([[[1,2]], [[3,4]], [[5,6]], [[7,8]], [[9,10]]]);

const list1dimension = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const list2dimensions = Object.freeze([[1,2], [3,4], [5,6], [7,8], [9,10]]);
const list3dimensions = Object.freeze([[[1,2]], [[3,4]], [[5,6]], [[7,8]], [[9,10]]]);

describe(`flatlist()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = flatlist(1);
            expect(curried).to.be.a('function');
            expect( collect( curried(list1dimension) ) ).to.deep.equal(array1dimension);
        }
    )

    it(`should return an iterable object that flattens the list to the specified depth`,
        function () {
            const result = flatlist(1, range(10));
            expect( isiterable(result) ).to.be.true;
            expect( collect(result) ).to.deep.equal(array1dimension);
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>flatlist(1, {}) ).to.throw();
        }
    )

    it(`should throw if the depth is not an integer of at least 0 or Infinity`,
        function () {
            expect( ()=>flatlist(-1, list1dimension) ).to.throw();
            expect( ()=>flatlist(1.4, list1dimension) ).to.throw();
            expect( ()=>flatlist('foobar', list1dimension) ).to.throw();
            
            expect( ()=>flatlist(Infinity, list1dimension) ).not.to.throw();
            expect( ()=>flatlist(3.0, list1dimension) ).not.to.throw();
            expect( ()=>flatlist(42, list1dimension) ).not.to.throw();
        }
    )

    it(`should flatten to the specified number of dimensions`,
        function () {
            expect( collect( flatlist(1, list2dimensions) ) ).to.deep.equal(array1dimension);
            expect( collect( flatlist(1, list3dimensions) ) ).to.deep.equal(array2dimensions);
            expect( collect( flatlist(2, list3dimensions) ) ).to.deep.equal(array1dimension);
        }
    )

    it(`should accept Infinity for the depth argument`,
        function () {
            expect( collect( flatlist(Infinity, list(list3dimensions)) ) ).to.deep.equal(array1dimension);
        }
    )

    it(`should not flatten strings to individual characters`,
        function () {
            expect( collect( flatlist(Infinity, ['foo','bar']) ) ).to.deep.equal(['foo','bar']);
        }
    )
})
