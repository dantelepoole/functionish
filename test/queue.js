const expect = require('chai').expect;
const queue = require('../queue');

describe(`queue()`, function() {

    it(`should return an object with enqueue(), dequeue() and peek() methods and a length property`,
        function () {
            const q = queue();
            expect(q.enqueue).to.be.a('function');
            expect(q.dequeue).to.be.a('function');
            expect(q.peek).to.be.a('function');
            expect(q.length).to.be.a('number');
        }
    )

    it(`should initialize the returned queue with its arguments`,
        function () {
            const q = queue( [42, 'foobar', 3] );

            expect(q.length).to.be.equal(3);
            expect(q.dequeue()).to.be.equal(42);
            expect(q.dequeue()).to.be.equal('foobar');
            expect(q.dequeue()).to.be.equal(3);
            expect(q.length).to.be.equal(0);
        }
    )

    describe(`queue.clear()`, function() {

        it(`should purge all items in the queue`,
            function () {
                const q = queue( [1,2,3] );
                expect(q.length).to.be.equal(3);
                expect(q.peek()).to.be.equal(1);

                q.clear();
                expect(q.length).to.be.equal(0);
                expect(q.peek()).to.be.undefined;

                q.enqueue(42);
                expect(q.length).to.be.equal(1);
                expect(q.peek()).to.be.equal(42);

                q.clear();
                expect(q.length).to.be.equal(0);
                expect(q.peek()).to.be.undefined;
            }
        )
    })
    
    describe(`queue.enqueue()`, function() {
    
        it(`should add its argument to the end of the queue`,
            function () {
                const symbol = Symbol();
                const q = queue();
    
                expect( q.length ).to.be.equal(0);
                q.enqueue(symbol);
                expect( q.length ).to.be.equal(1);
                expect( q.dequeue() ).to.be.equal(symbol);
    
                q.enqueue(symbol);
                q.enqueue('foobar');
                q.enqueue(42);
    
                expect( q.length ).to.be.equal(3);
    
                expect( q.dequeue() ).to.be.equal(symbol);
                expect( q.dequeue() ).to.be.equal('foobar');
                expect( q.dequeue() ).to.be.equal(42);
            }
        )
    
    
        it(`should work for null items`,
            function () {
                const q = queue();
                q.enqueue(null);
                expect(q.length).to.be.equal(1);
                expect(q.dequeue()).to.be.null;
            }
        )
    
        it(`should work for undefined items`,
            function () {
                const q = queue();
                q.enqueue(undefined);
                expect(q.length).to.be.equal(1);
                expect(q.dequeue()).to.be.undefined;
            }
        )
    
        it(`should work for NaN items`,
            function () {
                const q = queue();
                q.enqueue(NaN);
                expect(q.length).to.be.equal(1);
                expect(q.dequeue()).to.be.NaN;
            }
        )
    
        it(`should do nothing if not passed an argument`,
            function () {
                const q = queue();
                expect(q.length).to.be.equal(0);
                q.enqueue();
                expect(q.length).to.be.equal(0);
                expect(q.dequeue()).to.be.undefined;
            }
        )
    
        it(`should not depend on its runtime 'this'`,
            function () {
                const symbol = Symbol();
                const q = queue();
                const enqueue = q.enqueue;
    
                expect(q.length).to.be.equal(0);
                enqueue(symbol);
                expect(q.length).to.be.equal(1);
                expect(q.dequeue()).to.be.equal(symbol);
    
                const bound_enqueue = enqueue.bind({});
                expect(q.length).to.be.equal(0);
                bound_enqueue(symbol);
                expect(q.length).to.be.equal(1);
                expect(q.dequeue()).to.be.equal(symbol);
    
            }
        )
    })
    
    describe(`queue.length`, function() {
    
        it(`should be 0 when a queue is created without initial items`,
            function () {
                expect( queue().length ).to.be.equal(0);
            }
        )
    
        it(`should reflect the number of items in a queue after each operation on the queue`,
            function () {
                const q = queue( [42, 'foobar', 3] );
                expect(q.length).to.be.equal(3);
                q.dequeue();
                expect(q.length).to.be.equal(2);
                q.peek();
                expect(q.length).to.be.equal(2);
                q.dequeue();
                expect(q.length).to.be.equal(1);
                q.enqueue('Hari Seldon');
                expect(q.length).to.be.equal(2);
                q.dequeue();
                q.dequeue();
                expect(q.length).to.be.equal(0);
                q.dequeue();
                expect(q.length).to.be.equal(0);
                q.enqueue('foobar');
                expect(q.length).to.be.equal(1);
    
                expect( queue().length ).to.be.equal(0);
            }
        )
    
        it(`should be read-only`,
            function () {
                const q = queue();
    
                expect(q.length).to.be.equal(0);
                q.length = 42;
                expect(q.length).to.be.equal(0);
            }
        )
    })
    
    describe(`queue.peek()`, function() {
    
        it(`should return the item at the head of a queue without mutating the queue`,
            function () {
                const q = queue( [42] );
    
                expect( q.length ).to.be.equal(1);
                expect( q.peek() ).to.be.equal(42);
                expect( q.length ).to.be.equal(1);
    
                q.enqueue('foobar');
                expect( q.length ).to.be.equal(2);
                expect(q.peek() ).to.be.equal(42);
                expect( q.length ).to.be.equal(2);
    
                q.dequeue();
                expect( q.length ).to.be.equal(1);
                expect( q.peek() ).to.be.equal('foobar');
                expect( q.length ).to.be.equal(1);
            }
        )
    
        it(`should return undefined when a queue is empty`,
            function () {
                const q = queue();
                expect( q.peek() ).to.be.undefined;
    
                q.enqueue(42);
                expect( q.peek() ).to.be.equal(42);
    
                q.dequeue();
                expect( q.peek() ).to.be.undefined;
            }
        )
    
        it(`should not depend on its runtime 'this'`,
            function () {
                const symbol = Symbol();
                const q = queue( [symbol] );
                const peek = q.peek;
    
                expect(q.length).to.be.equal(1);
                expect( peek() ).to.be.equal(symbol);
                expect(q.length).to.be.equal(1);
                
                q.dequeue();
                const bound_peek = peek.bind({});
                q.enqueue(symbol);
                expect(q.length).to.be.equal(1);
                expect( bound_peek() ).to.be.equal(symbol);
                expect(q.length).to.be.equal(1);
            }
        )
    })
    
})