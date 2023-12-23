const Void = require('../src/Void');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = {}
const id = sinon.fake(x => x);

describe( 'Void()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            id.resetHistory();
        })
        
        it(`should always return undefined`, function() {

            expect( Void() ).to.be.undefined;
            expect( Void(42) ).to.be.undefined;
            expect( Void(true) ).to.be.undefined;
            expect( Void(id, UNIQTHING) ).to.be.undefined;
        })

        it(`should call the expression if the expression is a function`, function() {

            expect(id.callCount).to.equal(0);
            Void(id, UNIQTHING);
            expect(id.callCount).to.equal(1);
        })

        it(`should pass the args to the expression if the expression is a function`, function() {

            Void(id, UNIQTHING, 42, 'fubar');
            expect(id.args[0]).to.deep.equal([UNIQTHING,42,'fubar']);
        })

        it(`should throw if the expression throws`, function() {
            expect( () => Void( ()=> {throw new Error()}, UNIQTHING) ).to.throw();
        })
    }
);