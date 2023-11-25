const repeat = require('../src/repeat');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING' }
const id = sinon.fake(x => x);

let callcount = 0;
const countcalls = sinon.fake( () => ++callcount );

describe( 'repeat()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            id.resetHistory();
            countcalls.resetHistory();
            callcount = 0;
        })

        it(`should call the target function the specified number of times`, function() {

            expect(id.callCount).to.equal(0);

            repeat(3, id, UNIQTHING);

            expect(id.callCount).to.equal(3);
        })

        it(`should not call the target function if the count argument is 0`, function() {

            expect(id.callCount).to.equal(0);

            repeat(0, id, UNIQTHING);

            expect(id.callCount).to.equal(0);
        })

        it(`should pass its arguments to the target function on each call`, function() {

            repeat(3, id, 42, 'fubar', UNIQTHING);

            expect(id.args.every(params => params[0]===42 && params[1]==='fubar' && params[2]===UNIQTHING)).to.be.true;
        })

        it(`should return the return value of the last call to the target function`, function() {

            const retval = repeat(3, countcalls, 42, 'fubar', UNIQTHING);

            expect(retval).to.equal(3);
        })

        it(`should throw if the count argument is not an integer number of at least 0`, function() {

            expect( ()=>repeat(-1, id, UNIQTHING) ).to.throw;
            expect( ()=>repeat(null, id, UNIQTHING) ).to.throw;
            expect( ()=>repeat('fubar', id, UNIQTHING) ).to.throw;
        })

        it(`should throw if the target function is not a function`, function() {

            expect( ()=>repeat(0, UNIQTHING) ).to.throw;
            expect( ()=>repeat(0) ).to.throw;
        })
    }
);
