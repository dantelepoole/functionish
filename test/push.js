const expect = require('chai').expect;
const push = require('../push');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function createpushable(pushable) {

    const object = {
        push : (...args) => pushable.push(...args)
    }

    spy(object, 'push');

    return object;
}

const sentinel = {};

describe(`push()`, function() {

    beforeEach(
        function () {
            sandbox.resetHistory();
        }
    )

    it(`should pass the items to the pushable's push() method and return the result`,
        function() {

            const array = [];
            const pushable = createpushable(array);
            push(pushable, 1,2,sentinel);

            expect(array).to.deep.equal([1,2,sentinel]);
            expect(pushable.push.callCount).to.equal(1);
        }
    )

    it(`should throw if the argument has no push() method`,
        function() {
            expect( ()=>push({}, 1,2,3) ).to.throw();
            expect( ()=>push() ).to.throw();
            expect( ()=>push(null) ).to.throw();
        }
    )
})