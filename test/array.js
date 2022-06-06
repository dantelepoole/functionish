const array = require('../array');
const expect = require('chai').expect;

describe('array()', function() {

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
    expect( array([1,2,3]) ).to.be.deep.equal([1,2,3]);
    expect( array('foobar') ).to.be.deep.equal(['f','o','o','b','a','r']);
}

function test_returnemptyarray() {
    expect( array('') ).to.be.an('array').with.length(0);
    expect( array([]) ).to.be.an('array').with.length(0);
}

function test_reflectarray() {

    const list = [ {}, [], Symbol() ];
    expect( array(list) ).to.be.equal(list);
}

function test_returnemptyarrayifnotiterable() {
    expect( array({}) ).to.be.deep.equal([]);
}

function test_throwifnullorundefined() {
    expect( ()=>array() ).to.throw();
    expect( ()=>array(null) ).to.throw();
    expect( ()=>array(undefined) ).to.throw();
}