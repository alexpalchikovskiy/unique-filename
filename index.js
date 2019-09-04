const fs = require( 'fs-extra' );

class UniqueFilename{

    constructor(options){
        if( !options ){
            const options = {};
        }
        this.size = options.size || 10;
        this.before = options.before || '';
        this.after = options.after || '';
        this.separator = options.separator || '-';
        this.dir = options.dir || '';
        this.regExp = options.regExp || /[^a-zA-Z0-9 -]/g;

        this.word = '';
    }

    generate( _word, manual ){
        let answer = this.run( _word, manual );
        if( answer.error ){
            return answer;
        }else{
            return {
                name: answer,
                fullName: `${this.before}${answer}${this.after}`,
                path: `${this.dir}/${this.before}${answer}${this.after}`
            }
        }
    }

    run( _word, manual ){

        _word = _word.trim().toLowerCase().replace( this.regExp, '' ).replace( / /g, this.separator );
        this.word = _word;

        if( _word.length < this.size ){
            if( manual ){
                return {
                    error: `The length must be more than ${this.size}`
                };
            }else{
                _word = this.mixedRandom(this.word, this.size - this.word.length);
            }
        }

        let fileName = `${this.before}${_word}${this.after}`;
        let exist = this.dir ? fs.pathExistsSync( `${this.dir}/${fileName}` ) : false;

        if( exist ){
            if( manual ){
                return {
                    error: 'The name exist'
                };
            }else{
                _word = this.run( this.mixedRandom( this.word, this.size-this.word.length ), false );
            }

        }

        return _word;

    }

    mixedRandom( word, l ){

        let min = 5;
        let size = min > l ? min : l;

        let random =
            Math.random().toString(36).substring(2, Math.round(size/2)+2) +
            Math.random().toString(36).substring(2, size-Math.round(size/2)+2);

        return `${word}${word?this.separator:''}${random}`;

    }

}

module.exports = UniqueFilename;