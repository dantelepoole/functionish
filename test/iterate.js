const expect = require('chai').expect;
const iterate = require('../iterate');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const noop = spy( (...args)=>{ expect(args.length).to.equal(1) } );
// const noop = spy( ()=>{} );

function spyforeach(array) {

    const object = {
        forEach : array.forEach.bind(array)
    }

    spy(object, 'forEach');

    return object;
}

describe(`iterate()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = iterate(noop);
            expect(curried).to.be.a('function');
            expect(curried(range(5))).to.be.undefined;
        }
    )

    it(`should throw if the function is not a function`,
        function () {
            expect( ()=>iterate({}, [1,2,3]) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable and has no forEach() method`,
        function () {
            expect( ()=>iterate(noop, {}) ).to.throw();
        }
    )

    it(`should return undefined`,
        function () {
            expect( iterate(noop, []) ).to.be.undefined;
        }
    )

    it(`should forward the call to the list's forEach() method if it has one`,
        function () {
            const list = spyforeach([1,2,3]);
            iterate(noop, list);

            expect(list.forEach.callCount).to.equal(1);

            const noopcalls = noop.getCalls();
            expect(noopcalls.length).to.equal(3);
            expect(noopcalls[0].calledWith(1)).to.be.true;
            expect(noopcalls[1].calledWith(2)).to.be.true;
            expect(noopcalls[2].calledWith(3)).to.be.true;
        }
    )

    it(`should invoke the function for each item in the list if the list has no forEach() method but it is iterable`,
        function () {
            iterate(noop, range(3));

            const noopcalls = noop.getCalls();
            expect(noopcalls.length).to.equal(3);
            expect(noopcalls[0].calledWith(1)).to.be.true;
            expect(noopcalls[1].calledWith(2)).to.be.true;
            expect(noopcalls[2].calledWith(3)).to.be.true;
        }
    )

    it(`should throw if the list is a string`,
        function () {
            expect( ()=>iterate(noop, 'foobar') ).to.throw();
        }
    )
})
