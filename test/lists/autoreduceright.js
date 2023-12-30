const autoreduceright = require('../../src/lists/autoreduceright');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const paths = ['/', '/home', '../'];
const numbers1to5 = Object.freeze([1,2,3,4,5]);

const id = fake(x=>x);
const product = fake( (a,b)=>(a*b) );
const subtract = fake( (a,b)=>(a-b) );
const sum = fake( (a,b)=>(a+b) );

describe('lists/autoreduceright()', function() {

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
            should.return.a.function(autoreduceright, product)
            should.return(120, autoreduceright(product), numbers1to5);
        }
    )

    it('should throw if the reducder is not a function or a string', function() {
        should.throw(autoreduceright, 42, paths);
        should.throw(autoreduceright, {}, paths);
        should.throw(autoreduceright, paths, paths);
    })
    
    it('should throw if the reducer is a string that does not resolve to a function in a package or file module', function() {
        
        should.throw(autoreduceright, 'path#FuBar', paths);
        should.throw(autoreduceright, 'path#delimiter', paths);
    })

    it('should throw if the list is not iterable',
        function() {
            should.throw(autoreduceright, product, {});
            should.throw(autoreduceright, product, null);
        }
    )

    it('should return undefined if the list is empty without calling the reducer',
        function() {
            should.return.undefined(autoreduceright, product, []);
            should.not.be.called(product);
        }
    )

    it(`should return the list's last item if it is the sole item in the list without calling the reducer`,
        function() {
            should.return(UNIQTHING, autoreduceright, id, [UNIQTHING]);
            should.not.be.called(id);
        }
    )

    it(`should call the reducer n-1 times with n being the number of items in the list`,
        function() {

            autoreduceright(product, [1,2,3,4]);
            should.be(3, product.callCount);

            autoreduceright(sum, [1,2,3,4,5,6,7,8,9,10]);
            should.be(9, sum.callCount);

            autoreduceright(subtract, [1,2]);
            should.be(1, subtract.callCount);
        }
    )

    it(`should pass the list's second-to-last and last items to the reducer on the first call`,
        function() {

            autoreduceright(product, [1,2,3,4]);
            should.be.like([4,3], product.args[0]);
        }
    )

    it(`should iterate over the list's items in reverse, starting from the second-to-last item, in the manner of reduceright()`,
        function() {

            autoreduceright(product, [1,2,3,4]);

            should.be.like([4,3], product.args[0]);
            should.be.like([12,2], product.args[1]);
            should.be.like([24,1], product.args[2]);
        }
    )

    it(`should return the reducer's final return value`,
        function() {

            const result = autoreduceright(product, [1,2,3,4]);

            should.be(result, product.returnValues[product.returnValues.length-1]);
        }
    )
})