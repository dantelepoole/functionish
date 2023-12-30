const reduceright = require('../../src/lists/reduceright');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

const numbers1to5 = Object.freeze([1,2,3,4,5]);
const numbers1to5list = Object.freeze({ [Symbol.iterator]:numbers1to5.values.bind(numbers1to5) });

const id = fake(x=>x);
const subtract = fake( (a,b)=>(a-b) );

describe('lists/reduceright()', function() {

    beforeEach(
        function() {
            subtract.resetHistory();
        }
    )

    it('should be curried with binary arity',
        function() {
            should.return.a.function(reduceright, subtract);
            should.return.a.function(reduceright, subtract, 100);
            should.return(85, reduceright(subtract, 100), numbers1to5list);
        }
    )

    it('should throw if the reducer is not a function or a string', function() {
        should.throw(reduceright, 42, 100, numbers1to5list);
        should.throw(reduceright, {}, 100, numbers1to5list);
        should.throw(reduceright, numbers1to5list, 100, numbers1to5list);
    })
    
    it('should throw if the reducer is a string that does not resolve to a function in a package or file module', function() {
        
        should.throw(reduceright, 'path#FuBar', 100, numbers1to5list);
        should.throw(reduceright, 'path#delimiter', 100, numbers1to5list);
    })

    it('should throw if the list is not iterable',
        function() {
            should.throw(reduceright, subtract, 100, {});
            should.throw(reduceright, subtract, 100, null);
            should.throw(reduceright, subtract, 100, 42);
        }
    )

    it('should return the initial value if the list is empty without calling the reducer',
        function() {
            should.not.be.called(subtract);
            should.return(100, reduceright, subtract, 100, []);
            should.not.be.called(subtract);
        }
    )

    it(`should call the reducer once for each item in the list`,
        function() {
            reduceright(subtract, 100, numbers1to5list);
            should.be(5, subtract.callCount);
        }
    )

    it(`should pass the initial value and the list's last item to the reducer on the first call`,
        function() {

            reduceright(subtract, 100, numbers1to5list);
            should.be.like([100,5], subtract.args[0]);
        }
    )

    it(`should iterate over the list's items in reverse, passing the previous call's return value as well as the current list item`,
        function() {

            reduceright(subtract, 100, numbers1to5list);

            should.be.like([100,5], subtract.args[0]);
            should.be.like([95,4], subtract.args[1]);
            should.be.like([91,3], subtract.args[2]);
            should.be.like([88,2], subtract.args[3]);
            should.be.like([86,1], subtract.args[4]);
        }
    )

    it(`should call the list argument's reduceRight() method if it has one`,
        function() {

            const fakereduceright = fake(x => x);
            const sourcelist = { reduceRight:fakereduceright };
            const noop = fake( ()=> {} );

            reduceright(noop, UNIQTHING, sourcelist);

            should.be.called(fakereduceright);
            should.be.called.with([noop, UNIQTHING], fakereduceright);
        }
    )

    it(`should return the reducer's final return value`,
        function() {

            const result = reduceright(subtract, 100, numbers1to5list);

            should.be(result, 85);
        }
    )
})