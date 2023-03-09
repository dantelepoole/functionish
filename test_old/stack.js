const expect = require('chai').expect;
const stack = require('../stack');

describe(`stack()`, function() {

    it(`should return an object with the class name 'Stack'`,
        function () {
            const s = stack();
            expect( typeof s ).to.equal('object');
            expect( s ).to.be.a('Stack');
        }
    )

    it(`should initialize the stack with the initialitems (if any)`,
        function () {
            const sentinel = {};
            const s = stack(42,'foobar',sentinel);
            expect(s.length).to.be.equal(3);
            expect( s.pop() ).to.be.equal(sentinel);
            expect(s.length).to.be.equal(2);
            expect( s.pop() ).to.be.equal('foobar');
            expect(s.length).to.be.equal(1);
            expect( s.pop() ).to.be.equal(42);
            expect(s.length).to.be.equal(0);
            expect( s.pop() ).to.be.undefined;
        }
    )

    describe(`the stack's clear() method`, function() {

        it(`should remove all items from the stack`,
            function() {
                const s = stack(1,2,3);
                expect(s.length).to.be.equal(3);
                s.clear();
                expect(s.length).to.equal(0);
                expect(s.peek()).to.be.undefined;
            }
        )

        it(`should return undefined`,
            function() {
                const s = stack();
                expect(s.clear()).to.be.undefined;
            }
        )

        it(`should set the stack's length property to 0`,
            function() {
                const s = stack(42);
                expect(s.length).to.equal(1);
                s.clear();
                expect(s.length).to.equal(0);
            }
        )

        it(`should not depend on a this-object`,
            function() {
                const s = stack(42);
                const clear = s.clear;
                expect(s.length).to.equal(1);
                clear();
                expect( s.length ).to.equal(0);
            }
        )

    })

    describe(`the stack's peek() method`, function() {

        it(`should return the item at the top of the stack`,
            function() {
                const s = stack(1,2,3);
                expect(s.peek()).to.be.equal(3);
            }
        )

        it(`should return undefined if the stack is empty`,
            function() {
                const s = stack();
                expect(s.peek()).to.be.undefined;
            }
        )

        it(`should not change the stack's length nor the stack's top item`,
            function() {
                const s = stack(42);
                expect(s.length).to.equal(1);
                expect(s.peek()).to.equal(42);
                expect(s.length).to.equal(1);
                expect(s.peek()).to.equal(42);
            }
        )

        it(`should not depend on a this-object`,
            function() {
                const s = stack(42);
                const peek = s.peek;
                expect(s.length).to.equal(1);
                expect( peek() ).to.equal(42);
                expect( s.length ).to.equal(1);
            }
        )

    })

    describe(`the stack's pop() method`, function() {

        it(`should remove and return the item at the top of the stack`,
            function() {
                const s = stack(1,2,3);
                expect(s.pop()).to.be.equal(3);
                expect(s.peek()).to.be.equal(2);
            }
        )

        it(`should return undefined if the stack is empty`,
            function() {
                const s = stack();
                expect(s.pop()).to.be.undefined;
            }
        )

        it(`should decrement the stack's length property if the stack is not empty`,
            function() {
                const s = stack(42);
                expect(s.length).to.equal(1);
                expect(s.pop()).to.equal(42);
                expect(s.length).to.equal(0);
                s.pop();
                expect(s.length).to.equal(0);
            }
        )

        it(`should not depend on a this-object`,
            function() {
                const s = stack(42);
                const pop = s.pop;
                expect(s.length).to.equal(1);
                expect( pop() ).to.equal(42);
                expect( s.length ).to.equal(0);
                expect( pop() ).to.be.undefined;
                expect( s.length ).to.equal(0);
                s.push(43);
                expect( s.length ).to.equal(1);
                expect( pop() ).to.equal(43);
                expect( s.length ).to.equal(0);
            }
        )

    })

    describe(`the stack's push() method`, function() {

        it(`should add its arguments to the stack in order`,
            function() {
                const s = stack();
                s.push(1,2,3);
                expect(s.length).to.equal(3);
                expect( s.pop() ).equal(3);
                expect( s.pop() ).equal(2);
                expect( s.pop() ).equal(1);
                expect(s.length).to.equal(0);
            }
        )

        it(`should return undefined`,
            function() {
                const s = stack();
                expect( s.push(1,2,3) ).to.be.undefined;
            }
        )

        it(`should increase the stack's length property with the number of arguments`,
            function() {
                const s = stack(42);
                expect(s.length).to.equal(1);
                s.push(1);
                expect(s.length).to.equal(2);
                s.push();
                expect(s.length).to.equal(2);
                s.push(2,3,4,5);
                expect(s.length).to.equal(6);
            }
        )

        it(`should not depend on a this-object`,
            function() {
                const s = stack(42);
                const push = s.push;
                expect(s.length).to.equal(1);
                push(1,2,3)
                expect( s.length ).to.equal(4);
                expect( s.pop() ).to.equal(3);
                expect( s.pop() ).to.equal(2);
                expect( s.pop() ).to.equal(1);
                expect( s.pop() ).to.equal(42);
                expect( s.length ).to.equal(0);
            }
        )

    })

})