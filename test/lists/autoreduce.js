const autoreduce = require('../../src/lists/autoreduce');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const numbers1to5 = Object.freeze([1,2,3,4,5]);

const id = fake(x=>x);
const product = fake( (a,b)=>(a*b) );
const subtract = fake( (a,b)=>(a-b) );
const sum = fake( (a,b)=>(a+b) );

describe('autoreduce()', function() {

    beforeEach(
        function() {
            id.resetHistory();
            product.resetHistory();
            subtract.resetHistory();
            sum.resetHistory();
        }
    )

    it('should be curried with unary arity',
        function() {
            should.return.a.function(autoreduce, product)
            should.return(120, autoreduce(product), numbers1to5);
        }
    )

    it('should throw if the reducer is not a function',
        function() {
            should.throw(autoreduce, null, numbers1to5)
            should.throw(autoreduce, {}, numbers1to5);
        }
    )

    it('should throw if the list is not iterable',
        function() {
            should.throw(autoreduce, product, {});
            should.throw(autoreduce, product, null);
        }
    )

    it('should return undefined if the list is empty without calling the reducer',
        function() {
            should.return.undefined(autoreduce, product, []);
            should.not.be.called(product);
        }
    )

    it(`should return the list's first item if it is the sole item in the list without calling the reducer`,
        function() {
            should.return(UNIQTHING, autoreduce, id, [UNIQTHING]);
            should.not.be.called(id);
        }
    )

    it(`should call the reducer n-1 times with n being the number of items in the list`,
        function() {

            autoreduce(product, [1,2,3,4]);
            should.be(3, product.callCount);

            autoreduce(sum, [1,2,3,4,5,6,7,8,9,10]);
            should.be(9, sum.callCount);

            autoreduce(subtract, [1,2]);
            should.be(1, subtract.callCount);
        }
    )

    it(`should pass the list's first and second items to the reducer on the first call`,
        function() {

            autoreduce(product, [1,2,3,4]);
            should.be.like([1,2], product.args[0]);
        }
    )

    it(`should iterate over the list's items, starting from the second item, in the manner of reduce()`,
        function() {

            autoreduce(product, [1,2,3,4]);

            should.be.like([1,2], product.args[0]);
            should.be.like([2,3], product.args[1]);
            should.be.like([6,4], product.args[2]);
        }
    )

    it(`should return the reducer's final return value`,
        function() {

            const result = autoreduce(product, [1,2,3,4]);

            should.be(result, product.returnValues[product.returnValues.length-1]);
        }
    )
})