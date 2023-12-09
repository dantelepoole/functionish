const not = require('../../src/logic/not');
const expect = require('chai').expect;

describe('not()', function() {

    it('should return true if passed a falsy value', function() {
        expect( not(false) ).to.be.true;
        expect( not('') ).to.be.true;
        expect( not(0) ).to.be.true;
        expect( not(-0) ).to.be.true;
        expect( not(0n) ).to.be.true;
        expect( not(null) ).to.be.true;
        expect( not(undefined) ).to.be.true;
    }) 

    it('should return false if passed a truthy value', function() {
        expect( not(true) ).to.be.false;
        expect( not('true') ).to.be.false;
        expect( not(1) ).to.be.false;
        expect( not(-1) ).to.be.false;
        expect( not({}) ).to.be.false;
        expect( not([]) ).to.be.false;
        expect( not(not) ).to.be.false;
    }) 

    it('should return true if called without arguments', function() {
        expect( not() ).to.be.true;
    }) 
})