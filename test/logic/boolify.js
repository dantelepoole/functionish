const boolify = require('../../src/logic/boolify');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const id = sinon.fake(x=>x);

describe('boolify()', function() {

    beforeEach(
        function() {
            id.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( boolify(id) ).to.be.a('function');
    }) 

    describe('The function returned by boolify()', function() {

        it('should pass its arguments to the target function', function() {

            const booleanid = boolify(id);

            expect( id.callCount ).to.equal(0);

            booleanid(UNIQTHING, 42, Symbol.for('fubar'));

            expect( id.callCount ).to.equal(1);
            expect( id.args[0] ).to.deep.equal( [UNIQTHING, 42, Symbol.for('fubar')] );

        }) 

        it('should return boolean true if passed a truthy value', function() {

            const booleanid = boolify(id);

            expect( booleanid(true) ).to.be.true;
            expect( booleanid('true') ).to.be.true;
            expect( booleanid(1) ).to.be.true;
            expect( booleanid({}) ).to.be.true;
            expect( booleanid(id) ).to.be.true;

        }) 

        it('should return boolean false if passed a falsy value', function() {

            const booleanid = boolify(id);

            expect( booleanid(false) ).to.be.false;
            expect( booleanid('') ).to.be.false;
            expect( booleanid(0) ).to.be.false;
            expect( booleanid(null) ).to.be.false;

        }) 

        it('should return boolean false if called without arguments', function() {
            expect( boolify(id)() ).to.be.false;
        }) 

        it('should throw if the target function is not a function', function() {

            const booleannone = boolify();
            
            expect( booleannone ).to.throw();
        })
    })
})