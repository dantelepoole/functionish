const dispense = require('../../src/lists/dispense');
const should = require('../../lib/test/should');

const UNIQTHING = { Label:'UNIQTHING' };
const numbers1to5 = Object.freeze([1,2,3,4,5]);

describe('lists/dispense()', function() {

    it('should return a function',
        function() {
            should.return.a.function(dispense, numbers1to5);
        }
    )

    it('should throw if the source list is not iterable',
        function() {
            should.throw(dispense, {});
            should.throw(dispense, null);
            should.throw(dispense, dispense);
            should.throw(dispense);
        }
    )

    describe('The function returned by dispense()', function() {

        it('should subsequent items from the source list on each call',
            function() {

                const dispenser = dispense(numbers1to5);
                
                should.return(1, dispenser);
                should.return(2, dispenser);
                should.return(3, dispenser);
                should.return(4, dispenser);
                should.return(5, dispenser);
            }
        )

        it('should return undefined on any calls after the last item from the source list has been dispensed',
            function() {

                const dispenser = dispense([1,2,3]);
                
                should.return(1, dispenser);
                should.return(2, dispenser);
                should.return(3, dispenser);

                should.return.undefined(dispenser);
                should.return.undefined(dispenser);
                should.return.undefined(dispenser);
            }
        )

        it('should, if passed any arguments, return its first argument after the last item from the source list has been dispensed',
            function() {

                const dispenser = dispense([1,2,3]);
                
                should.return(1, dispenser);
                should.return(2, dispenser);
                should.return(3, dispenser);

                should.return(UNIQTHING, dispenser, UNIQTHING);
                should.return(42, dispenser, 42);
                should.return(dispenser, dispenser, dispenser);
            }
        )
    })

})