const UniqueFilename = require( './index' );

let filename = new UniqueFilename(
    {
        size: 8,
        before: 'img-',
        after: '.png',
        separator: '-',
        dir: './images',
        regExp: /[^a-zA-Z0-9 -]/g
    }
);


let query = 'Fire';

let answer = filename.generate( query );

console.log( answer );