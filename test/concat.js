const expect = require('chai').expect;
const concat = require('../concat');

const marker = Object.freeze({});

describe('concat()', function() {

    beforeEach(
        function() {

        }
    )

    it('should pass its second argument to the concat() method of its first argument and return the result',
        function () {
            const list1 = { concat: (arg) => { return arg } };
            const result = concat(list1, marker);

            expect(result).to.be.equal(marker);
        }
    )

    it('should throw if the first argument does not have a `concat()` method',
        function () {
            expect( () => concat({}, []) ).to.throw();
        }
    )

    it('should return a new array containing the items of its first argument followed by those of the second argument',
        function () {
            
            const list1 = [1,2,3];
            const list2 = [4,5,6];

            const result = concat(list1, list2);

            expect(result).to.be.deep.equal( [...list1, ...list2] );
            expect(result).not.to.be.equal(list1);
            expect(result).not.to.be.equal(list2);
        }
    )

    it('should work with strings',
        function () {
            
            const result = concat('abc', 'def');
            expect(result).to.be.equal( 'abcdef' );
        }
    )

    it('should return an empty array if both arguments are empty arrays, ditto an empty string if both are empty strings',
        function () {
            
            expect( concat([], []) ).to.be.deep.equal( [] );
            expect( concat('', '') ).to.be.equal('');
        }
    )


    it('should be curried',
        function () {

            const curried = concat([1,2,3]);
            expect(curried).to.be.a('function');

            const result = curried([4,5,6]);
            expect(result).to.be.deep.equal([1,2,3,4,5,6])
        }
    )

    })