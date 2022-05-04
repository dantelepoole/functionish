const expect = require('chai').expect;
const stack = require('../stack');

describe(`stack()`, function() {

    it(`should return an object with methods clear(), peek(), pop() and push() and an integer property length`,
        function () {
            const s = stack();
            expect(s).to.be.an('object');
            expect(s.clear).to.be.a('function');
            expect(s.peek).to.be.a('function');
            expect(s.pop).to.be.a('function');
            expect(s.push).to.be.a('function');
            expect(s.length).to.be.a('number');
        }
    )

    it(`should initialize the stack with the argument array if one is provided`,
        function () {
            const s = stack([1,2,3]);
            expect(s.length).to.be.equal(3);
            expect(s.pop()).to.be.equal(3);
            expect(s.pop()).to.be.equal(2);
            expect(s.pop()).to.be.equal(1);
            expect(s.length).to.be.equal(0);
        }
    )

    it(`should not modify the argument array if one is provided`,
        function () {
            const numbers = [1,2,3];
            const s = stack(numbers);
            expect(numbers).to.be.deep.equal([1,2,3]);
            s.clear();
            expect(numbers).to.be.deep.equal([1,2,3]);
        }
    )

    it(`should throw an error if the argument is not an array`,
        function () {
            expect( ()=>stack(42) ).to.throw();
            expect( ()=>stack({}) ).to.throw();
            expect( ()=>stack('foobar') ).to.throw();
        }
    )

    it(`should remove and return the last item when pop() is called`,
        function () {
            const s = stack([1,2,3]);
            expect(s.length).to.be.equal(3);
            expect(s.pop()).to.be.equal(3);
            expect(s.length).to.be.equal(2);
        }
    )

    it(`should return the last item when peek() is called without removing it from the stack`,
        function () {
            const s = stack([1,2,3]);
            expect(s.length).to.be.equal(3);
            expect(s.peek()).to.be.equal(3);
            expect(s.length).to.be.equal(3);
            expect(s.peek()).to.be.equal(3);
        }
    )

    it(`should empty the stack when clear() is called`,
        function () {
            const s = stack([1,2,3]);
            expect(s.length).to.be.equal(3);
            s.clear();
            expect(s.length).to.be.equal(0);
        }
    )

    it(`should add the arguments to the stack when push() is called`,
        function () {
            const s = stack();
            expect(s.length).to.be.equal(0);
            s.push(1);
            expect(s.length).to.be.equal(1);
            expect(s.peek()).to.be.equal(1);
            s.push(2,3);
            expect(s.length).to.be.equal(3);
            expect(s.pop()).to.be.equal(3);
            expect(s.pop()).to.be.equal(2);
            expect(s.pop()).to.be.equal(1);
        }
    )

    it(`should have a read-only length property`,
        function () {
            const s = stack();
            expect(s.length).to.be.equal(0);
            s.length = 42;
            expect(s.length).to.be.equal(0);
        }
    )

    it(`should return undefined for peek() and pop() if the stack is empty`,
        function () {
            const s = stack();
            expect(s.length).to.be.equal(0);
            expect(s.peek()).to.be.undefined;
            expect(s.pop()).to.be.undefined;
        }
    )
})