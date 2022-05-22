const toarray = require('../toarray');
const expect = require('chai').expect;

describe('toarray()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return an array containing the items from the iterable in order', test_returnarray);
    it('should return the iterable if the iterable is already an array', test_reflectarray);
    it('should return an empty array if the iterable produces no items', test_returnemptyarray);
    it('should return an empty array if the iterable is not iterable', test_returnemptyarrayifnotiterable);
    it('should throw if iterable is null or undefined', test_throwifnullorundefined);

})

function test_returnarray() {
    expect( toarray([1,2,3]) ).to.be.deep.equal([1,2,3]);
    expect( toarray('foobar') ).to.be.deep.equal(['f','o','o','b','a','r']);
}

function test_returnemptyarray() {
    expect( toarray('') ).to.be.an('array').with.length(0);
    expect( toarray([]) ).to.be.an('array').with.length(0);
}

function test_reflectarray() {

    const array = [ {}, [], Symbol() ];
    expect( toarray(array) ).to.be.equal(array);
}

function test_returnemptyarrayifnotiterable() {
    expect( toarray({}) ).to.be.deep.equal([]);
}

function test_throwifnullorundefined() {
    expect( ()=>toarray() ).to.throw();
    expect( ()=>toarray(null) ).to.throw();
    expect( ()=>toarray(undefined) ).to.throw();
}