const toarray = require('../toarray');
const expect = require('chai').expect;

describe('toarray()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return an array containing the items from the iterable in order', test_returnarray);
    it('should return a shallow copy of the iterable if the iterable is an array', test_shallowcopyarray);
    it('should return an empty array if the iterable produces no items', test_returnemptyarray);
    it('should throw if the iterable is not iterable', test_throwbaditerable);
    it('should apply the mapfunc to each item in the iterable if a mapfunc is provided', test_applymapfunc);
    it('should throw if the mapfunc is not a function', test_throwbadmapfunc);

})

function double(x) {
    return x*2;
}

function uppercase(str) {
    return str.toUpperCase();
}

function test_applymapfunc() {

    expect( toarray([3,4,5], double) ).to.be.deep.equal( [6,8,10] );
    expect( toarray( 'foobar', uppercase) ).to.be.deep.equal( ['F','O','O','B','A','R'] );
}

function test_returnarray() {
    expect( toarray() ).to.be.deep.equal([]);
    expect( toarray([1,2,3]) ).to.be.deep.equal([1,2,3]);
    expect( toarray('foobar') ).to.be.deep.equal(['f','o','o','b','a','r']);
}

function test_returnemptyarray() {
    expect( toarray() ).to.be.an('array').with.length(0);
    expect( toarray('') ).to.be.an('array').with.length(0);
    expect( toarray([]) ).to.be.an('array').with.length(0);
}

function test_shallowcopyarray() {

    const array = [ {}, [], Symbol() ];
    expect( toarray(array) ).to.be.deep.equal(array);
    expect( toarray(array) ).not.to.be.equal(array);
    expect( toarray(array)[0] ).to.be.equal( array[0] );
    expect( toarray(array)[1] ).to.be.equal( array[1] );
    expect( toarray(array)[2] ).to.be.equal( array[2] );
}

function test_throwbaditerable() {
    expect( ()=>toarray({}).to.throw() );
}

function test_throwbadmapfunc() {
    expect( ()=>toarray([3,4,5], {}) ).to.throw();
}