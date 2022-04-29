const expect = require('chai').expect;
const groupby = require('../groupby');
const isvoid = require('../isvoid');

let invocationcount = 0;

function getgradefromscore(studentscore) {

    invocationcount += 1;

    return studentscore?.score === undefined ? undefined
         : studentscore.score < 65 ? 'F'
         : studentscore.score < 70 ? 'D'
         : studentscore.score < 80 ? 'C'
         : studentscore.score < 90 ? 'B'
         : 'A';
}

const studentscores = [];

function containsstudentscore(grades,studentscore) {

    for( grade in grades ) if( grades[grade].includes(studentscore) ) return true;

    return false;
}

describe(`groupby()`, function() {

    beforeEach(
        function() {

            invocationcount = 0;

            const scores = [
                { name:'Anne', score:55 },
                { name:'Bruce', score:73 },
                { name:'Christine', score:82 },
                { name:'Donald', score:100 },
                { name:'Edward', score:0 },
                { name:'Francis' }
            ]

            studentscores.length = 0;
            studentscores.push(...scores);
        }
    )

    it(`should be curried`,
        function () {

            const curried = groupby(getgradefromscore);
            expect(curried).to.be.a('function');

            const result = curried(studentscores);
            expect(result).to.be.an('object');
        }
    )

    it(`should throw if its first argument is not a function`,
        function () {
            const operation = () => groupby('foobar', studentscores);
            expect(operation).to.throw();
        }
    )

    it(`should throw if its second argument does not have a forEach() method`,
        function () {
            const operation = () => groupby(getgradefromscore, {});
            expect(operation).to.throw();
        }
    )

    it(`should call its first argument once for each item in its second argument`,
        function () {
            const result = groupby(getgradefromscore, studentscores);
            expect( invocationcount ).to.be.equal( studentscores.length );
        }
    )

    it(`should return an object that contains each item for which the first argument returns a non-empty key`,
        function () {
            const result = groupby(getgradefromscore, studentscores);
            
            for( score of studentscores ) {
                if( ! isvoid( getgradefromscore(score) ) ) expect( containsstudentscore(result, score) ).to.be.true;
            }
        }
    )

    it(`should return an object that does not contain any item for which the first argument returns an empty key`,
        function () {
            const result = groupby(getgradefromscore, studentscores);
            
            for( score of studentscores ) {
                if( isvoid( getgradefromscore(score) ) ) expect( containsstudentscore(result, score) ).to.be.false;
            }
        }
    )
})