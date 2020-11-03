export class Movie{
    constructor(
        public title : string,
        public plot : string,
        public directors : string,
        public ratings : string[],
        public actors : string,
        public releaseYear : string,
        public poster : string,
        private id ?: string,
    ){}
    
}