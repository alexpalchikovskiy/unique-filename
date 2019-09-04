# unique-filename

Unique filename generator. Can compares files in some folder. Can generates name based on your query.

## Install

```
npm i unique-filename --save
```

## How to use

```
const UniqueFilename = require( 'unique-filename' );

const filename = new UniqueFilename( [options] );

let result = filename.generate( 'YOUR_QUERY' ); // query can be empty

if( !result.error ){
    console.log( 'Name: ' + result.name );
}else{
    console.log( 'Error: ' + result.error );
}
```

## Options (is not required)

`separator` - words separator, as default '-'

`size` - min name length, as default 10

`regExp` - regular expression, as default /[^a-zA-Z0-9 -]/g

`before` - string at the begin of filename as default '' (empty string)

`after` - string at the end of filename as default '' (empty string)

`dir` - dir with files for compare, as default empty and generator makes single filename without compare

## What's will return? :)

Method "`generate`" return Object with properties:

`name` - string

`fullName` - string, `name` with before and after strings from options

`path` - string, `fullName` with dir from options

if error, return only one property:

`error` - string, error text


## Example

```
const UniqueFilename = require( 'unique-filename' );

const filename = new UniqueFilename(
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
```

Output:
```
{ 
    name: 'fire-fuzeg',
    fullName: 'img-fire-fuzeg.png',
    path: './images/img-fire-fuzeg.png' 
}
```