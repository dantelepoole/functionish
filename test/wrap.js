const wrap = require('../wrap');
const expect = require('chai').expect;

let wasinvokedwith = [];

function sum(a,b) {
    wasinvokedwith = [a,b];
    return (a+b);
}

function double(func, a, b) {
    expect(func).to.be.equal(sum);
    expect(arguments.length).to.be.equal(3);
    return func(a*2,b*2) * 2;
}

describe('wrap()', function() {

    beforeEach(
        function() {
            wasinvokedwith = [];
        }
    )

    it('should be curried with binary arity',
        function () {
            const curried = wrap(double);
            expect(curried).to.be.a('function');

            const wrapped = curried(sum);
            expect(wrapped).to.be.a('function');

            expect( wrapped(1,2) ).to.be.a('number');
        }
    )

    it('should return a function',
        function () {
            const wrapped = wrap(double, sum);
            expect(wrapped).to.be.a('function');
        }
    )

    describe('the returned function', function() {

        beforeEach(
            function() {
                wasinvokedwith = [];
            }
        )
    
        it('should invoke wrapperfunc with func followed by the arguments to the returned function',
            function () {
                const wrapped = wrap(double, sum);
                wrapped(1,2);
            }
        )

        it('should throw if either wrapperfunc or func is not a function',
            function () {
                const wrapped = wrap({}, {});
                expect( ()=>wrapped() ).to.throw();
            }
        )
    })
})