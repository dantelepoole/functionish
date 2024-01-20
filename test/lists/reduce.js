const reduce = require('../../src/lists/reduce');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const paths = ['/', '/home', '../'];
const numbers1to5 = Object.freeze([1,2,3,4,5]);
const numbers1to5list = Object.freeze({ [Symbol.iterator]:numbers1to5.values.bind(numbers1to5) });

const id = fake(x=>x);
const product = fake( (a,b)=>(a*b) );
const subtract = fake( (a,b)=>(a-b) );
const sum = fake( (a,b)=>(a+b) );

describe('lists/reduce()', function() {

    beforeEach(
        function() {
            id.resetHistory();
            product.resetHistory();
            subtract.resetHistory();
            sum.resetHistory();
        }
    )

    it('should be curried with binary arity',
        function() {
            should.return.a.function(reduce, sum);
            should.return.a.function(reduce, sum, 0);
            should.return(15, reduce(sum, 0), numbers1to5list);
        }
    )

    it('should throw if the reducer is not a function or a string', function() {
        should.throw(reduce, 42, 0, numbers1to5list);
        should.throw(reduce, {}, 0, numbers1to5list);
        should.throw(reduce, paths, 0, numbers1to5list);
    })
    
    it('should throw if the reducer is a string that does not resolve to a function in a package or file module', function() {
        
        should.throw(reduce, 'path#FuBar', 0, numbers1to5list);
        should.throw(reduce, 'path#delimiter', 0, numbers1to5list);
    })

    it('should throw if the list is not iterable',
        function() {
            should.throw(reduce, sum, 0, {});
            should.throw(reduce, sum, 0, null);
            should.throw(reduce, sum, 0, 42);
        }
    )

    it('should return the initial value if the list is empty without calling the reducer',
        function() {
            should.not.be.called(sum);
            should.return(0, reduce, sum, 0, []);
            should.not.be.called(sum);
        }
    )

    it(`should call the reducer once for each item in the list`,
        function() {
            reduce(sum, 0, numbers1to5list);
            should.be(5, sum.callCount);
        }
    )

    it(`should pass the initial value and the list's first item to the reducer on the first call`,
        function() {

            reduce(sum, 0, numbers1to5list);
            should.be.like([0,1], sum.args[0]);
        }
    )

    it(`should iterate over the list's items, passing the previous call's return value as well as the current list item`,
        function() {

            reduce(sum, 0, numbers1to5list);

            should.be.like([0,1], sum.args[0]);
            should.be.like([1,2], sum.args[1]);
            should.be.like([3,3], sum.args[2]);
            should.be.like([6,4], sum.args[3]);
            should.be.like([10,5], sum.args[4]);
        }
    )

    it(`should call the list argument's reduce() method if it has one`,
        function() {

            const fakereduce = fake(x => x);
            const sourcelist = { reduce:fakereduce };
            const noop = fake( ()=> {} );

            reduce(noop, UNIQTHING, sourcelist);

            should.be.called(fakereduce);
            should.be.called.with( [noop, UNIQTHING], fakereduce );
        }
    )

    it(`should return the reducer's final return value`,
        function() {

            const result = reduce(sum, 0, numbers1to5list);

            should.be(result, 15);
        }
    )

    describe('If the initialvalue is set to the reduce.Auto property, reduce()', function() {

        beforeEach(
            function() {

            }
        )

        it('should return undefined if the list is empty without calling the reducer', function() {

                should.return.undefined(reduce, product, reduce.Auto, []);
                should.not.be.called(product);
        })

        it(`should return the list's first item if it is the sole item in the list without calling the reducer`, function() {

            should.return(UNIQTHING, reduce, id, reduce.Auto, [UNIQTHING]);
            should.not.be.called(id);
        })

        it(`should call the reducer n-1 times with n being the number of items in the list`, function() {

            reduce(product, reduce.Auto, [1,2,3,4]);
            should.be(3, product.callCount);

            reduce(sum, reduce.Auto, [1,2,3,4,5,6,7,8,9,10]);
            should.be(9, sum.callCount);

            reduce(subtract, reduce.Auto, [1,2]);
            should.be(1, subtract.callCount);
        })

        it(`should pass the list's first and second items to the reducer on the first call`, function() {

            reduce(product, reduce.Auto, [1,2,3,4]);
            should.be.like([1,2], product.args[0]);
        })

        it(`should iterate over the list's items, starting from the second item, in the manner of reduce()`, function() {

            reduce(product, reduce.Auto, [1,2,3,4]);

            should.be.like([1,2], product.args[0]);
            should.be.like([2,3], product.args[1]);
            should.be.like([6,4], product.args[2]);
        })
    })
})