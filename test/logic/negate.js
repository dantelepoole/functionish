const negate = require('../../src/logic/negate');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const id = sinon.fake(x=>x);


describe('negate()', function() {

    beforeEach(
        function() {
            id.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( negate(id) ).to.be.a('function');
    }) 

    describe('The function returned by negate()', function() {

        it('should pass its arguments to the target function', function() {

            const notid = negate(id);

            expect( id.callCount ).to.equal(0);

            notid(UNIQTHING, 42, Symbol.for('fubar'));

            expect( id.callCount ).to.equal(1);
            expect( id.args[0] ).to.deep.equal( [UNIQTHING, 42, Symbol.for('fubar')] );

        }) 

        it('should return boolean false if passed a truthy value', function() {

            const notid = negate(id);

            expect( notid(true) ).to.be.false;
            expect( notid('true') ).to.be.false;
            expect( notid(1) ).to.be.false;
            expect( notid({}) ).to.be.false;
            expect( notid(id) ).to.be.false;

        }) 

        it('should return boolean true if passed a falsy value', function() {

            const notid = negate(id);

            expect( notid(false) ).to.be.true;
            expect( notid('') ).to.be.true;
            expect( notid(0) ).to.be.true;
            expect( notid(null) ).to.be.true;

        }) 

        it('should return boolean true if called without arguments', function() {
            expect( negate(id)() ).to.be.true;
        }) 

        it('should throw if the target function is not a function', function() {

            const notnone = negate();
            
            expect( notnone ).to.throw();
        })
    })
})