const expect = require('chai').expect;
const pop = require('../pop');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function createpoppable(poppable) {

    const object = {
        pop : () => poppable.pop()
    }

    spy(object, 'pop');

    return object;
}

const sentinel = {};

describe(`pop()`, function() {

    beforeEach(
        function () {
            sandbox.resetHistory();
        }
    )

    it(`should invoke its argument's pop() method and return the result`,
        function() {
            const poppable = createpoppable([sentinel]);
            const item = pop(poppable);

            expect(item).to.equal(sentinel);
            expect(poppable.pop.callCount).to.equal(1);

            expect( pop(poppable) ).to.be.undefined;
            expect(poppable.pop.callCount).to.equal(2);
        }
    )

    it(`should throw if the argument has no pop() method`,
        function() {
            expect( ()=>pop({}) ).to.throw();
            expect( ()=>pop() ).to.throw();
            expect( ()=>pop(null) ).to.throw();
        }
    )
})